import "./StockDetailPage.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hook";

export default function StockDetailPage() {
  const { id } = useParams();
  const stocks = useAppSelector((state: any) => state.stocks.stocks);
  const stock = stocks.find((s: any) => s.stock_name === id);

  return (
    <div id="stock-detail-box">
      <div id="stock-graph">hello</div>
      <div id="history-notification-box">hello</div>
    </div>
  );
}
