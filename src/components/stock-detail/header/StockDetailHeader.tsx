import * as React from "react";
import "./StockDetailHeader.scss";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { TransactionStatus, TransactionType } from "../../../constants/enums";
import { addUserTransaction } from "../../../store/slices/user/transactionsSlice";
import { updateUserProfile } from "../../../store/slices/user/profileSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { showToast } from "../../../utils/ToastService";

interface StockDetailHeaderType {
  price: number;
  percentageChange: number;
  currentStock: any;
  setCurrentStock: React.Dispatch<React.SetStateAction<any>>;
  setBars: React.Dispatch<React.SetStateAction<any>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setPercentageChange: React.Dispatch<React.SetStateAction<number>>;
  userBalance: number;
  stockId: string | undefined;
  stockOwned: any;
}

export default function StockDetailHeader({
  price,
  percentageChange,
  currentStock,
  setCurrentStock,
  setBars,
  setPrice,
  setPercentageChange,
  userBalance,
  stockId,
  stockOwned,
}: StockDetailHeaderType) {
  const stocks = useAppSelector((state: any) => state.stocks.stocks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [stockQuantity, setStockQuantity] = React.useState<number | string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const sortedStocks = stocks
    .slice()
    .sort((a: any, b: any) => a.stock_name.localeCompare(b.stock_name));

  const basePriceByStockName = stocks.find(
    (stock: any) => stock._id === stockId
  );

  const handleStockChange = (event: any) => {
    const selectedStock = stocks.find((s: any) => s._id === event.target.value);
    setCurrentStock(selectedStock);
    setPrice(0);
    setPercentageChange(0);
    setBars([]);
    navigate(`/dashboard/${selectedStock._id}`);
  };

  const handleStockQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*\.?\d+$/.test(value) && parseFloat(value) >= 0) {
      setStockQuantity(value);
    } else if (value === "") {
      setStockQuantity("");
    } else {
      setStockQuantity("0");
    }
  };

  const handleTransaction = async (type: string) => {
    if (Number(stockQuantity) <= 0 || isNaN(Number(stockQuantity))) {
      showToast("Please enter a valid quantity.", "warning");
      return;
    }

    const transactionPrice =
      (basePriceByStockName?.base_price + price) * Number(stockQuantity);
    let status = TransactionStatus.FAILED;

    if (type === TransactionType.BUY) {
      if (userBalance >= transactionPrice) {
        try {
          const netBalance = (userBalance - transactionPrice).toFixed(2);
          await dispatch(
            updateUserProfile({
              current_balance: netBalance,
            })
          );
        } catch (error) {
          console.error("Error updating user balance: ", error);
        }
        status = TransactionStatus.PASSED;
        setStockQuantity("");
        showToast("Stocks bought successfully 🎉", "success");
      } else {
        setStockQuantity("");
        showToast("Insufficient balance for the transaction!", "warning");
      }
    } else if (
      type === TransactionType.SELL &&
      stockQuantity <= stockOwned?.quantity
    ) {
      try {
        const netBalance = (userBalance + transactionPrice).toFixed(2);
        await dispatch(
          updateUserProfile({
            current_balance: netBalance,
          })
        );
      } catch (error) {
        console.error("Error updating user balance: ", error);
      }
      status = TransactionStatus.PASSED;
      setStockQuantity("");
      showToast("Stocks sold successfully", "success");
    } else {
      setStockQuantity("");
      showToast("Insufficient stock holdings!", "warning");
    }

    const transaction = {
      stock_id: currentStock._id,
      stock_name: currentStock.stock_name,
      stock_quantity: stockQuantity,
      timestamp: new Date().toISOString(),
      transaction_price: basePriceByStockName?.base_price + price,
      type: type,
      status: status,
    };

    setLoading(true);

    try {
      await dispatch(addUserTransaction(transaction));
    } catch (error) {
      console.error(error);
      showToast("Error making transaction!", "error");
    }
  };

  return (
    <div className="stock-detail-header">
      <Select
        id="current-stock"
        value={currentStock._id || ""}
        onChange={handleStockChange}
        color="secondary"
        className="stocks-select"
      >
        {sortedStocks.map((s: any) => (
          <MenuItem key={s._id} value={s._id}>
            <div className="stock-logo">
              {s.stock_name.substring(0, 3).toUpperCase()}
            </div>
            <div>
              {s.stock_name.length > 20
                ? s.stock_name.substring(0, 20) + "..."
                : s.stock_name}
            </div>
          </MenuItem>
        ))}
      </Select>
      <div className="stock-owned">
        Holdings: {stockOwned?.quantity ? stockOwned.quantity : 0}
      </div>
      <div className="stock-price">
        <div>Price</div>
        <div style={{ color: percentageChange > 0 ? "#2f9e44" : "#e03131" }}>
          {basePriceByStockName?.base_price + price}
          {percentageChange > 0 ? "\u2191" : "\u2193"}
        </div>
        <div className="stock-change-percentage">
          {percentageChange.toFixed(2)}%
        </div>
      </div>
      <TextField
        id="outlined-basic"
        label="Enter quantity"
        className="stock-quantity"
        variant="outlined"
        color="secondary"
        value={stockQuantity}
        onChange={handleStockQuantityChange}
      />
      <Button
        variant="contained"
        color="success"
        onClick={() => handleTransaction(TransactionType.BUY)}
        className="buy-button"
      >
        Buy
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleTransaction(TransactionType.SELL)}
        className="sell-button"
        disabled={!stockOwned?.quantity}
      >
        Sell
      </Button>
    </div>
  );
}
