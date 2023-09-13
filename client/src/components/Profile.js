import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";
import "./Registration.css";
import Male from "../assets/images/male.jpg";
import Female from "../assets/images/female.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${apiBaseUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false); 
        })
        .catch((error) => {
          setLoading(false); 
        });
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={4} style={{ padding: "20px" }} className="profile">
        <Typography variant="h4">Profile</Typography>
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : user && (user.gender === "male" || user.gender === "Male") ? (
          <div>
            <img src={Male} alt="not found" style={{marginLeft:"25%"}} />
            <Typography variant="h4">Welcome, {user.username}!</Typography>
            <Typography variant="body1"><b>Full Name:</b> {user.firstName} {user.lastName}</Typography>
            <Typography variant="body1"><b>Gender:</b> {user.gender}</Typography>
            <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
            <Typography variant="body1"><b>Designation:</b> {user.designation}</Typography>
            <Typography variant="body1"><b>Hobbies:</b> {user.hobbies}</Typography>
            <Typography variant="body1"><b>Address:</b> {user.address}</Typography>
          </div>
        ) : user && (user.gender === "female" || user.gender === "Female") ? (
          <div>
            <img src={Female} alt="not found" style={{marginLeft:"25%"}}/>
            <Typography variant="h3">Welcome, {user.username}!</Typography>
            <Typography variant="body1"><b>Full Name:</b> {user.firstName} {user.lastName}</Typography>
            <Typography variant="body1"><b>Gender:</b> {user.gender}</Typography>
            <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
            <Typography variant="body1"><b>Designation:</b> {user.designation}</Typography>
            <Typography variant="body1"><b>Hobbies:</b> {user.hobbies}</Typography>
            <Typography variant="body1"><b>Address:</b> {user.address}</Typography>
          </div>
        ) : (
          <Typography variant="body1">
            Loading failed. Please try again later.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
