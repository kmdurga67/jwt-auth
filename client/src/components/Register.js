import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Registration.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  const usernameRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(4, "It accepts more than 4 characters"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Email should have @")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        /^\d{10}$/,
        "Phone number should not be greater than 10 numbers & It accepts only digits"
      )
      .required("Phone Number is required"),
    designation: Yup.string().required("Designation is required"),
    hobbies: Yup.string().required("Hobbies is required"),
    address: Yup.string().required("Address is required"),
    username: Yup.string()
      .required("Username is required")
      .matches(
        usernameRegx,
        "Username must contain at least One Uppercase, One lowercase & One digit"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase, one lowercase, one digit, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "It should be same as create password"
      )
      .required("Confirm Password is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female", "other"], "Invalid gender"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      designation: "",
      hobbies: "",
      address: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    validationSchema: validationSchemas,
    onSubmit: async (values,formikBag) => {
      try {
        await axios.post(`${apiBaseUrl}/api/auth/register`, values);
        toast.success("Registration Successful");

        setTimeout(() => {
          formikBag.resetForm();
        }, 3000);
      } catch (error) {
        toast.error("Registration Failed");
      }
    },
  });

  return (
    <Container maxWidth="lg" className="container">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Registration
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <FormControl
            component="fieldset"
            fullWidth
            margin="dense"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <Typography variant="subtitle1" gutterBottom>
              Gender
            </Typography>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender && (
              <Typography variant="body2" color="error">
                {formik.errors.gender}
              </Typography>
            )}
          </FormControl>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            label="Designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={
              formik.touched.designation && Boolean(formik.errors.designation)
            }
            helperText={formik.touched.designation && formik.errors.designation}
          />
          <TextField
            label="Hobbies"
            name="hobbies"
            value={formik.values.hobbies}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
            helperText={formik.touched.hobbies && formik.errors.hobbies}
          />
          <TextField
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
