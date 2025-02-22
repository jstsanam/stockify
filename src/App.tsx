import Header from "./components/header/Header";
import "./App.scss";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import StockDetailPage from "./components/stock-detail/StockDetailPage";
import { useEffect, useState } from "react";
import MyProfile from "./components/my-profile/MyProfile";
import Footer from "./components/footer/Footer";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { authSliceActions } from "./store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "./store/slices/user/profileSlice";
import AllTransactions from "./components/all-transactions/AllTransactions";
import { ToastService } from "./utils/ToastService";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: any) => state.authentication.token);
  const [currentStock, setCurrentStock] = useState<any>(null);

  const validateToken = (token: string) => {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      console.warn("Token expired");
      dispatch(authSliceActions.logout());
    }
  };

  useEffect(() => {
    if (token) {
      try {
        validateToken(token);
        dispatch(getUserProfile());
      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch(authSliceActions.logout());
      }
    }
  }, [token, dispatch]);

  return (
    <div className="body">
      <BrowserRouter>
        <ToastService />
        <Routes>
          {token ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <>
                    <Header />
                    <Dashboard setCurrentStock={setCurrentStock} />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/dashboard/:id"
                element={
                  <>
                    <Header />
                    <StockDetailPage
                      currentStock={currentStock}
                      setCurrentStock={setCurrentStock}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/my-profile"
                element={
                  <>
                    <Header />
                    <MyProfile />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/all-transactions"
                element={
                  <>
                    <Header />
                    <AllTransactions />
                    <Footer />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
