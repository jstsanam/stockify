import * as React from "react";
import "./StockDetailHeader.scss";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface StockDetailHeaderType {
  stocks: any;
  price: number;
  percentageChange: number;
}

export default function StockDetailHeader({
  stocks,
  price,
  percentageChange,
}: StockDetailHeaderType) {
  const { id } = useParams();
  const navigate = useNavigate();
  const stock = stocks.find((s: any) => s.stock_name === id);
  const [currentStock, setCurrentStock] = React.useState<any>(
    stock || stocks[0] || {}
  );

  const handleChange = (event: any) => {
    const selectedStock = stocks.find(
      (s: any) => s.stock_name === event.target.value
    );
    setCurrentStock(selectedStock);
    navigate(`/dashboard/${selectedStock.stock_name}`);
  };

  return (
    <div className="stock-detail-header">
      <Box className="stocks-select">
        <FormControl fullWidth>
          <Select
            id="current-stock"
            value={currentStock.stock_name || ""}
            onChange={handleChange}
          >
            {stocks.map((s: any) => (
              <MenuItem key={s.stock_name} value={s.stock_name}>
                <div className="stock-logo">
                  {s.stock_name.substring(0, 3).toUpperCase()}
                </div>
                <div>
                  {s.stock_name.length > 25
                    ? s.stock_name.substring(0, 25) + "..."
                    : s.stock_name}
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className="stock-price">
        <div>Price</div>
        <div>{price} &uarr;</div>
        <div>{percentageChange.toFixed(2)}%</div>
      </div>
      <input
        type="text"
        className="stock_quantity"
        placeholder="Enter quantity"
      />
      <button className="buy-button">Buy</button>
      <button className="sell-button">Sell</button>
    </div>
  );
}
