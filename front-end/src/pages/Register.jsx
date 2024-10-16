import { Box, Button, TextField, Typography } from "@mui/material";
import $ from "jquery";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../api/auth";
import { login } from "../redux/authSlice";
import "./Login.css";

export default function Register() {
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      const body = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        birth_date: $("#birth_date").val(),
      };

      setLoading(true);
      register(body)
        .then((res) => {
          console.log(res);
          if (res?.ok) {
            toast.success(res?.message ?? "Account has been registered");
            setCookie("AUTH_TOKEN", res.data.token);
            dispatch(login(res.data));
            navigate("/");
          } else {
            toast.error(res?.message ?? "Something went wrong.");
            setWarnings(res?.errors);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
       
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
          maxWidth: 1000,
          width: "100%",
        }}
      >
        <Box
          id="registerbg"
          sx={{
            p: 4,
            width: { xs: "100%", sm: "50%" },
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#BE9B25" }}
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            SIGN UP
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                required
                id="first_name"
                fullWidth
                size="small"
                label="First Name"
              />
              <TextField
                required
                id="last_name"
                fullWidth
                size="small"
                label="Last Name"
              />
            </Box>
            <TextField
              required
              id="name"
              fullWidth
              size="small"
              label="Username"
              sx={{ mb: 2 }}
            />
            {warnings?.name && (
              <Typography component="small" color="error">
                {warnings.name}
              </Typography>
            )}
            <TextField
              required
              id="email"
              fullWidth
              size="small"
              label="Email Address"
              type="email"
              sx={{ mb: 2 }}
            />
            {warnings?.email && (
              <Typography component="small" color="error">
                {warnings.email}
              </Typography>
            )}
            <TextField
              required
              id="birth_date"
              fullWidth
              size="small"
              label="Birth Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            {warnings?.birth_date && (
              <Typography component="small" color="error">
                {warnings.birth_date}
              </Typography>
            )}
            <TextField
              required
              id="password"
              fullWidth
              size="small"
              label="Enter Password"
              type="password"
              sx={{ mb: 2 }}
            />
            {warnings?.password && (
              <Typography component="small" color="error">
                {warnings.password}
              </Typography>
            )}
            <TextField
              required
              id="password_confirmation"
              fullWidth
              size="small"
              label="Confirm Password"
              type="password"
              sx={{ mb: 2 }}
            />
            {warnings?.password_confirmation && (
              <Typography component="small" color="error">
                {warnings.password_confirmation}
              </Typography>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#BE9B25",
                  "&:hover": { backgroundColor: "#9B7A1E" },
                }}
              >
                REGISTER
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
