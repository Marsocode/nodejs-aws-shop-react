import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? "/";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e:any): void => {
    e.preventDefault();

    if (!login || !password) {
      setError("Please enter login and password");
      return;
    }
    const token = btoa(`${login}:${password}`);

    localStorage.setItem("authorization_token", token);
    window.dispatchEvent(new Event("authChanged"));
    navigate(from, { replace: true });
  };

  const handleLogout = (): void => {
    localStorage.removeItem("authorization_token");
  };

  return (
    <Box
      sx={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {error && (
        <Alert
          severity="error"
          variant="outlined"
          sx={{ width: 400 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">Login</Typography>

        <TextField
          label="Login"
          variant="standard"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>

          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
