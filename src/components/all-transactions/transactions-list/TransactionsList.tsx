import { TransactionStatus, TransactionType } from "../../../constants/enums";
import "./TransactionsList.scss";

interface TransactionsListType {
  searchedTransactions: any[];
}

export default function TransactionsList({
  searchedTransactions,
}: TransactionsListType) {
  const groupedTransactions = [...searchedTransactions]
    .sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .reduce((acc: Record<string, any[]>, transaction: any) => {
      const dateObj = new Date(transaction.timestamp);
      const date = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}-${dateObj.getFullYear()}`;

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});

  return (
    <div className="transactions-list">
      {Object.keys(groupedTransactions).length === 0 ? (
        <div className="no-transactions-found">
          No such transactions found.
        </div>
      ) : (
        <>
          {Object.entries(groupedTransactions).map(
            ([date, transactions]: [string, any[]]) => (
              <div key={date} className="day-wise-transaction">
                <div className="transaction-date">{date}</div>
                <hr className="dotted-divider" />
                {transactions.map((transaction: any, index: any) => (
                  <div key={index} className="transaction-in-day">
                    <div className="transaction-detail">
                      <div>{transaction.stock_name}</div>
                      <div
                        style={{
                          color:
                            transaction.status === TransactionStatus.PASSED
                              ? "#35a249"
                              : "#e13d3c",
                        }}
                      >
                        {transaction.status}
                      </div>
                      <div>{transaction.transaction_price}</div>
                      <div>
                        {new Date(transaction.timestamp).toLocaleTimeString(
                          "en-US",
                          { hour: "numeric", minute: "numeric", hour12: true }
                        )}
                      </div>
                      <div
                        style={{
                          backgroundColor:
                            transaction.type === TransactionType.BUY
                              ? "#b1f2ba"
                              : "#ffc9c9",
                        }}
                        className="transaction-type"
                      ></div>
                    </div>
                    <hr className="divider" />
                  </div>
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
