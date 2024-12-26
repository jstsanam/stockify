import "./StockDetailPage.scss";
import { useAppSelector } from "../../store/hook";
import StockDetailHeader from "./StockDetailHeader";
import GraphContainer from "./GraphContainer";
import { useEffect, useState } from "react";
import HistoryTransactions from "./HistoryTransactions";
import { getHistoryBuySell } from "../../services/api";

export default function StockDetailPage() {
  const stocks = useAppSelector((state: any) => state.stocks.stocks);

  const [price, setPrice] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [historyBuySell, setHistoryBuySell] = useState<any>(null);

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

  useEffect(() => {
    const fetchHistoryBuySell = async () => {
      try {
        const data = await getHistoryBuySell("api/history");
        const passedTransactions = data.filter((transaction: any) => transaction.status === "Passed");
        setHistoryBuySell(passedTransactions);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchHistoryBuySell();
    const interval = setInterval(fetchHistoryBuySell, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stock-detail-box">
      <div className="stock-graph">
        <StockDetailHeader
          stocks={stocks}
          price={price}
          percentageChange={percentageChange}
        />
        <GraphContainer price={price} percentageChange={percentageChange} />
      </div>
      <div className="history-notification-box">
        <div className="history">
          <HistoryTransactions historyBuySell={historyBuySell}/>
        </div>
        <div className="notification">notification</div>
      </div>
    </div>
  );
}
