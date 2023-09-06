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
import Male from "../images/male.jpg";
import Female from "../images/female.jpg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/profile", {
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
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "16px" }} className="profile">
        <Typography variant="h4">Profile</Typography>
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : user && user.gender === "Male" ? (
          <div>
            <img src={Male} alt="not found" />
            <Typography variant="h6">Welcome, {user.username}!</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
          </div>
        ) : user && user.gender === "Female" ? (
          <div>
            <img src={Female} alt="not found" />
            <Typography variant="h6">Welcome, {user.username}!</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
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
