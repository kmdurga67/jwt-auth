import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppBar, CssBaseline, Toolbar, Typography, Link } from "@mui/material";
import ErrorBoundary from './ErrorBoundaries/ErrorBoundary';
import './ErrorBoundaries/styles.css';
import './App.css';

function App() {
  return (
    <ErrorBoundary className="error-boundary">
      <AppBar position="static" color="default">
        <Toolbar className="app-toolbar">
          <Typography>
            <Link to="/">
              <img
                src="https://cdn3.vectorstock.com/i/1000x1000/10/32/login-form-authentication-icon-on-white-vector-23391032.jpg"
                height={"80px"}
                width={"80px"}
                alt="no images found"
              />
            </Link>
          </Typography>
          <Typography variant="h2">
            JWT AUTHENTICATION FORM
          </Typography>
          <div className="nav-links">
            <Typography variant="h5">
              <Link to="/login">Login</Link>
            </Typography>
            <Typography variant="h5">
              <Link to="/">Sign Up</Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
