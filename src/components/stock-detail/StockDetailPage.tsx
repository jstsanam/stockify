import "./StockDetailPage.scss";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import StockDetailHeader from "./header/StockDetailHeader";
import GraphContainer from "./graph-container/GraphContainer";
import { useEffect, useState } from "react";
import HistoryTransactions from "./transactions-history/HistoryTransactions";
import { fetchStocks } from "../../store/slices/stockSlice";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Notifications from "./notifications/Notifications";
import BackToDashboard from "../shared/BackToDashboard";

interface StockDetailPageType {
  currentStock: any;
  setCurrentStock: React.Dispatch<React.SetStateAction<any>>;
}

export default function StockDetailPage({
  currentStock,
  setCurrentStock,
}: StockDetailPageType) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state: any) => state.stocks.stocks);

  const [userBalance, setUserBalance] = useState<number>(2000);
  const [price, setPrice] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [bars, setBars] = useState<
    Array<{ height: number; color: string; borderColor: string }>
  >([]);

  useEffect(() => {
    if (!stocks || stocks.length === 0) {
      dispatch(fetchStocks());
    }
  }, [dispatch, stocks]);

  useEffect(() => {
    if (stocks && stocks.length !== 0 && id) {
      const stock = stocks.find((s: any) => s._id === id);
      if (stock) {
        setCurrentStock(stock);
        setPrice(0);
        setPercentageChange(0);
        setBars([]);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, stocks]);

  function generateRandomPrice() {
    return Math.floor(Math.random() * 501);
  }

  function calculatePercentageChange(newPrice: number, oldPrice: number) {
    if (oldPrice === 0) return newPrice === 0 ? 0 : 100;
    const change = ((newPrice - oldPrice) / Math.abs(oldPrice)) * 100;
    return Math.max(-100, Math.min(100, change));
  }

  useEffect(() => {
    let previousPrice = 0;

    const interval = setInterval(() => {
      const newPrice = generateRandomPrice();
      const calculatedPercentage = calculatePercentageChange(
        newPrice,
        previousPrice
      );

      setPrice(newPrice);
      setPercentageChange(calculatedPercentage);

      previousPrice = newPrice;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!currentStock)
    return (
      <Stack
        sx={{
          color: "grey.500",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40rem",
        }}
      >
        <CircularProgress color="secondary" />
      </Stack>
    );

  return (
    <>
      <BackToDashboard />
      <div className="stock-detail-page">
        <div className="stock-graph">
          <StockDetailHeader
            price={price}
            percentageChange={percentageChange}
            currentStock={currentStock}
            setCurrentStock={setCurrentStock}
            setBars={setBars}
            setPrice={setPrice}
            setPercentageChange={setPercentageChange}
            userBalance={userBalance}
            setUserBalance={setUserBalance}
          />
          <GraphContainer
            price={price}
            percentageChange={percentageChange}
            bars={bars}
            setBars={setBars}
          />
        </div>
        <div className="history-notification-box">
          <div className="history">
            <HistoryTransactions stockId={id} userBalance={userBalance} />
          </div>
          <div className="notification">
            <Notifications />
          </div>
        </div>
      </div>
    </>
  );
}
