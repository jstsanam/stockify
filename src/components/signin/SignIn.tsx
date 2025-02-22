import "./SignIn.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { userSignin } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/ToastService";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signinError, setSigninError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninError(false);
    setUserData({ ...userData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = {
      email: !emailRegex.test(userData.email.trim()),
      password: userData.password.trim().length < 8,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setLoading(true);

    try {
      await dispatch(userSignin({ userData })).unwrap();
      showToast("Welcome back 🙋🏻‍♀️", "default");
      setUserData({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setSigninError(true);
      showToast("Error logging in!", "error");
      setUserData({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-area">
      <Card sx={{ boxShadow: 5 }} className="sign-in-box">
        <img src="/logo.png" alt="App logo" />
        <div className="sign-in-heading">
          Welcome Back! Sign In to Continue Growing Your Wealth.
        </div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="sign-in-textfield"
        >
          <TextField
            required
            label="Email"
            type="email"
            variant="outlined"
            color="secondary"
            id="email"
            error={errors.email}
            helperText={errors.email ? "Enter a valid email address" : ""}
            value={userData.email}
            onChange={addData}
          />
          <TextField
            required
            label="Password"
            type="password"
            variant="outlined"
            color="secondary"
            id="password"
            error={errors.password}
            helperText={
              errors.password
                ? "Password must be minimum 8 characters long"
                : ""
            }
            value={userData.password}
            onChange={addData}
          />
          {signinError && (
            <div style={{ color: "#db453d" }}>Incorrect Email or Password!</div>
          )}
          <Button
            variant="contained"
            color="secondary"
            className="sign-in-button"
            size="large"
            type="submit"
            disabled={
              signinError ||
              userData.email.trim() === "" ||
              userData.password.trim() === "" ||
              loading
            }
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
        <div className="new-account-link">
          <div>New to Stockify?</div>
          <Button onClick={() => navigate("/signup")} color="secondary">
            Create an account
          </Button>
        </div>
      </Card>
    </div>
  );
}
