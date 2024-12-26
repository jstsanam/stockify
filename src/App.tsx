import Header from "./components/Header";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hook";
import { fetchStocks } from "./store/slices/stockSlice";
import { portfolioTxns } from "./store/slices/portfolioTxnsSlice";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import StockDetailPage from "./components/stocks-detail/StockDetailPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(portfolioTxns());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<StockDetailPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
