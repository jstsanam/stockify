import Header from "./components/Header";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hook";
import { fetchStocks } from "./store/slices/stockSlice";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
