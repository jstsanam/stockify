import "./MyPortfolio.scss";
import BackToDashboard from "../shared/BackToDashboard";
import { useAppSelector } from "../../store/hook";

export default function Portfolio() {
  const transactions = useAppSelector(
    (state: any) => state.transactionsHistory.transactions
  );

  console.log("portfolio: ", transactions);
  return (
    <div className="my-portfolio-page">
      <BackToDashboard />
    </div>
  );
}
