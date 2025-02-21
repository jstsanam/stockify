import "./AllTransactions.scss";
import BackToDashboard from "../shared/BackToDashboard";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { useEffect, useState } from "react";
import { getUserTransactions } from "../../store/slices/user/transactionsSlice";
import FilterBox from "./filter-box/FilterBox";
import TransactionsList from "./transactions-list/TransactionsList";
import { TransactionType } from "../../constants/enums";

export default function AllTransactions() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state: any) => state.userTransactions.transactions
  );

  const [allTransactions, setAllTransactions] = useState<any[]>(
    transactions || []
  );
  const [searchedTransactions, setSearchedTransactions] = useState<any[]>(
    transactions || []
  );
  const [stocksPresent, setStocksPresent] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getUserTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactions?.length > 0) {
      setAllTransactions(transactions);
      setSearchedTransactions(transactions);
      const stockNames: string[] = Array.from(
        new Set(transactions.map((transaction: any) => transaction.stock_name))
      );
      setStocksPresent(stockNames);
    }
  }, [transactions]);

  return (
    <>
      <BackToDashboard />
      {allTransactions?.length === 0 ? (
        <div className="no-transactions-available">
          Start buying stocks to see the transactions here.
        </div>
      ) : (
        <>
          <div className="info-box">
            &#x2a;
            <div
              className="transaction-type"
              style={{
                backgroundColor: "#b1f2ba",
              }}
            ></div>
            <div> = {TransactionType.BUY},</div>&nbsp;
            <div
              className="transaction-type"
              style={{
                backgroundColor: "#ffc9c9",
              }}
            ></div>
            <div> = {TransactionType.SELL}</div>
          </div>
          <div className="all-transactions-page">
            <FilterBox
              stocksPresent={stocksPresent}
              allTransactions={allTransactions}
              setSearchedTransactions={setSearchedTransactions}
            />
            <TransactionsList searchedTransactions={searchedTransactions} />
          </div>
        </>
      )}
    </>
  );
}
