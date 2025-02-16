import "./MyProfile.scss";
import BackToDashboard from "../shared/BackToDashboard";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { updateUserProfile } from "../../store/slices/user/profileSlice";
import { GenderType } from "../../constants/enums";

export default function MyProfile() {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state: any) => state.userProfile.profile);

  const [userData, setUserData] = useState<any>({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    gender: userProfile?.gender || "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: false });
  };

  const genderSelect = (e: string) => {
    setUserData({ ...userData, gender: e });
  };

  useEffect(() => {
    if (userProfile) {
      setUserData({
        name: userProfile.name,
        email: userProfile.email,
        gender: userProfile.gender,
      });
    }
  }, [userProfile]);

  const handleUpdateUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = {
      name: userData.name.trim().length < 3,
      email: !emailRegex.test(userData.email.trim()),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      await dispatch(updateUserProfile(userData));
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  return (
    <>
      <BackToDashboard />
      <div className="my-profile-page">
        <Card sx={{ boxShadow: 5 }} className="profile-box">
          <div className="edit-profile-heading">Edit Profile</div>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleUpdateUserProfile}
            className="profile-textfield"
          >
            <div className="user-genders">
              <button
                className="gender-buttons"
                onClick={() => genderSelect(GenderType.HE)}
                type="button"
              >
                <img
                  src="/assets/male.png"
                  style={{
                    backgroundColor:
                      userData.gender === GenderType.HE ? "#9c27b0" : "",
                  }}
                  alt="Male logo"
                />
                <div className="gender-name">Male</div>
              </button>
              <button
                className="gender-buttons"
                onClick={() => genderSelect(GenderType.SHE)}
                type="button"
              >
                <img
                  src="/assets/female.png"
                  style={{
                    backgroundColor:
                      userData.gender === GenderType.SHE ? "#9c27b0" : "",
                  }}
                  alt="Female logo"
                />
                <div className="gender-name">Female</div>
              </button>
            </div>
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
            <Button
              variant="contained"
              color="secondary"
              className="save-changes-button"
              size="large"
              type="submit"
              disabled={
                userData.email.trim() === "" ||
                userData.name.trim() === "" ||
                JSON.stringify(userProfile) === JSON.stringify(userData)
              }
            >
              Save changes
            </Button>
          </Box>
        </Card>
      </div>
    </>
  );
}
