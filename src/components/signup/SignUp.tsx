import "./SignUp.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { userSignup } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { GenderType } from "../../constants/enums";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    gender: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupError(false);
    setUserData({ ...userData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: false });
  };

  const genderSelect = (e: SelectChangeEvent<string>) => {
    setSignupError(false);
    setUserData({ ...userData, gender: e.target.value });
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
      await dispatch(userSignup({ userData })).unwrap();
      setUserData({ name: "", email: "", gender: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      setSignupError(true);
      setUserData({ name: "", email: "", gender: "", password: "" });
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
          <div className="name-gender-row">
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
            <FormControl
              required
              sx={{ minWidth: 162 }}
              color="secondary"
            >
              <InputLabel id="gender-select">Gender</InputLabel>
              <Select
                labelId="gender-select"
                id="gender"
                label="Gender *"
                value={userData.gender}
                onChange={genderSelect}
              >
                <MenuItem value={GenderType.HE} color="secondary">Male</MenuItem>
                <MenuItem value={GenderType.SHE} color="secondary">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
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
          {signupError && (
            <div style={{ color: "#db453d" }}>User already exists!</div>
          )}
          <Button
            variant="contained"
            color="secondary"
            className="sign-up-button"
            size="large"
            type="submit"
            disabled={
              signupError ||
              userData.email.trim() === "" ||
              userData.password.trim() === "" ||
              userData.name.trim() === "" ||
              userData.gender.trim() === ""
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
