import Header from "./components/header/Header";
import "./App.scss";
import Dashboard from "./components/dashboard-page/Dashboard";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import StockDetailPage from "./components/stock-detail-page/StockDetailPage";
import { useState } from "react";
import Portfolio from "./components/my-portfolio-page/MyPortfolio";
import MyProfile from "./components/my-profile-page/MyProfile";
import Footer from "./components/footer/Footer";

function App() {
  const [currentStock, setCurrentStock] = useState<any>(null);

  return (
    <div className="body">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard setCurrentStock={setCurrentStock} />}
          />
          <Route
            path="/dashboard/:id"
            element={
              <StockDetailPage
                currentStock={currentStock}
                setCurrentStock={setCurrentStock}
              />
            }
          />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-portfolio" element={<Portfolio />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
