import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, useTheme } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { adminAtom } from "../../../../recoil/atoms/adminAtom";
import { useRecoilState } from "recoil";
import { BACKEND_URL } from "../../../../globals";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const { role } = useParams();

  const [admin, setAdmin] = useRecoilState(adminAtom);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? "#a5d8ff" : "#1565c0";

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    const data = new FormData(event.currentTarget);
    const identifier = data.get("username");
    const password = data.get("password");

    fetch(`${BACKEND_URL}/admin/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    })
      .then(async (res) => {
        const response = await res.json();
        setLoading(false);

        setUsernameError(response.message);

        localStorage.setItem("token", response.token);
        setAdmin(response.adminUser);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const validateInputs = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let isValid = true;

    if (!username || username.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/admin/dashboard");
    }
  }, [loggedIn, navigate]);

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Typography sx={{ color, fontSize: "1.25rem", fontWeight: "bold" }}>
          Atria IT ISE Department
        </Typography>
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Admin Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            name="username"
            placeholder="username"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color="primary"
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color="primary"
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Box>
    </Card>
  );
}
