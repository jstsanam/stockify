import "./SignUp.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { userSignup } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = {
      name: userData.name.trim().length < 3,
      email: !emailRegex.test(userData.email.trim()),
      password: userData.password.trim().length < 8,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      await dispatch(userSignup({ userData }));
    } catch (error) {
      console.error("Error sending user data: ", error);
    }
  };

  return (
    <div className="sign-up-area">
      <Card sx={{ boxShadow: 5 }} className="sign-up-box">
        <img src="/logo.png" />
        <div className="sign-up-heading">
          Sign Up to Begin Your Financial Growth Journey!
        </div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="sign-up-textfield"
        >
          <TextField
            required
            label="Name"
            variant="outlined"
            color="secondary"
            id="name"
            error={errors.name}
            helperText={
              errors.name ? "Name must be minimum 3 characters long" : ""
            }
            value={userData.name}
            onChange={addData}
          />
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
          <Button
            variant="contained"
            color="secondary"
            className="sign-up-button"
            size="large"
            type="submit"
            disabled={
              userData.email.trim() === "" ||
              userData.password.trim() === "" ||
              userData.name.trim() === ""
            }
          >
            Sign Up
          </Button>
        </Box>
        <div className="existing-account-link">
          Already have an account?
          <Button onClick={() => navigate("/signin")} color="secondary">
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
}
