import "./HistoryTransactions.scss";

interface HistoryTransactionsType {
  historyBuySell: any;
}

export default function HistoryTransactions({
  historyBuySell,
}: HistoryTransactionsType) {
  return (
    <div className="history-box">
      <div className="history-title">History</div>
      <div className="history-stocks">
        {(historyBuySell || [])
          .slice()
          .reverse()
          .map((item: any, index: number) => (
            <div key={index} className="history-stock">
              <div>
                <div>
                  {item.stocksQuantity}{" "}
                  {item.stocksQuantity == 1 ? "stock" : "stocks"}
                </div>
                <div className="stock-timestamp"> {new Date(item.timestamp).toUTCString()}</div>
              </div>
              <div
                style={{ color: item.type === "Buy" ? "#2f9e44" : "#e03131" }}
              >
                {item.type}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
