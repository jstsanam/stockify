import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import "./UserTransactions.scss";
import { TransactionType } from "../../../constants/enums";
import { getUserTransactions } from "../../../store/slices/user/transactionsSlice";

interface HistoryTransactionsType {
  stockId: string | undefined;
  userBalance: number;
}

export default function UserTransactions({
  stockId,
  userBalance,
}: HistoryTransactionsType) {
  const dispatch = useAppDispatch();

  const passedTransactions = useAppSelector(
    (state: any) => state.userTransactions.passedTransactions
  );

  let transactionsByStockName;
  if (passedTransactions) {
    transactionsByStockName = passedTransactions.filter(
      (transaction: any) => transaction.stock_id === stockId
    );
  }

  useEffect(() => {
    dispatch(getUserTransactions());
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
                    {item.stock_quantity}{" "}
                    {item.stock_quantity === 1 ? "stock" : "stocks"}
                    {item.type === TransactionType.BUY ? " bought at " : " sold at "}
                    {item.transaction_price}
                  </div>
                  <div className="stock-timestamp">
                    {" "}
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
                <div
                  style={{
                    color:
                      item.type === TransactionType.BUY ? "#2f9e44" : "#e03131",
                  }}
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
