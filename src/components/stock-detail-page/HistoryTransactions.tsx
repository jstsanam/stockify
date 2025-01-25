import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import "./HistoryTransactions.scss";
import { fetchTransactionsHistory } from "../../store/slices/transactionsHistorySlice";

interface HistoryTransactionsType {
  stockId: string | undefined;
  userBalance: number;
}

export default function HistoryTransactions({
  stockId,
  userBalance,
}: HistoryTransactionsType) {
  const dispatch = useAppDispatch();

  const passedTransactions = useAppSelector(
    (state: any) => state.transactionsHistory.passedTransactions
  );
  const transactionsByStockName = passedTransactions.filter(
    (transaction: any) => transaction.transaction_id === stockId
  );

  useEffect(() => {
    dispatch(fetchTransactionsHistory());
  }, [dispatch]);

  return (
    <div className="history-box">
      <div className="history-header">
        <div className="history-title">History</div>
        <div className="user-balance">Balance: {userBalance}</div>
      </div>
      <div className="history-stocks">
        {transactionsByStockName && transactionsByStockName.length === 0 ? (
          <div style={{ margin: "0.5rem", color: "rgba(0, 0, 0, 0.3)" }}>
            No transactions available for this stock.
          </div>
        ) : (
          transactionsByStockName
            .slice()
            .reverse()
            .map((item: any, index: number) => (
              <div key={index} className="history-stock">
                <div>
                  <div>
                    {item.stocksQuantity}{" "}
                    {item.stocksQuantity == 1 ? "stock" : "stocks"}
                  </div>
                  <div className="stock-timestamp">
                    {" "}
                    {new Date(item.timestamp).toUTCString()}
                  </div>
                </div>
                <div
                  style={{ color: item.type === "Buy" ? "#2f9e44" : "#e03131" }}
                >
                  {item.type}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
