import { useState } from "react";
import "./Dashboard.scss";
import StocksTable from "./stocks-table-dashboard/StocksTable";

export default function Dashboard() {
  const [exploreOn, setExploreOn] = useState<boolean>(true);

  return (
    <div>
      <button
        onClick={() => setExploreOn(true)}
        className="dashboard-button-group"
        style={{
          textDecoration: exploreOn ? "underline" : "",
          textDecorationColor: exploreOn ? "#468ccd" : "",
          textDecorationThickness: exploreOn ? "0.2rem" : "",
        }}
      >
        EXPLORE
      </button>
      <button
        onClick={() => setExploreOn(false)}
        className="dashboard-button-group"
        style={{
          textDecoration: !exploreOn ? "underline" : "",
          textDecorationColor: !exploreOn ? "#468ccd" : "",
          textDecorationThickness: !exploreOn ? "0.2rem" : "",
        }}
      >
        MY WATCHLIST
      </button>
      <div id="table-container">
        <StocksTable exploreOn={exploreOn} />
      </div>
    </div>
  );
}
