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
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import { adminAtom } from "../../../../recoil/atoms/adminAtom";
import { useRecoilState } from "recoil";
import { BACKEND_URL } from "../../../../globals";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const [loggedIn, setLoggedIn] = React.useState();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [wrongPass, setWrongPass] = React.useState("");
  const [wrongUsername, setWrongUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? "#a5d8ff" : "#1565c0";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usernameError || passwordError) {
      return;
    }

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
        if (response.message === "User not found") {
          setWrongUsername("User doesn't exist");
          setWrongPass("");
          setLoading(false);
          return;
        } else if (response.message === "Incorrect Password") {
          setWrongPass("Password is incorrect");
          setWrongUsername("");
          setLoading(false);
          return;
        }
        return response;
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("token", data.token);
          setLoggedIn(data);
          setWrongUsername("");
          setWrongPass("");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const validateInputs = () => {
    setWrongPass("");
    setWrongUsername("");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let isValid = true;

    if (!username.value || username.value.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
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
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BACKEND_URL}/admin/dashboard`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data)
        setAdmin(data.adminUser);
      } catch (err) {
        setAdmin(null)
        console.log(err);
      }
    };

    fetchData();
  }, []);

  React.useEffect(()=>{
    if(admin){
      console.log(admin)
      navigate('/admin/dashboard')
    }
  },[admin, navigate])

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Typography sx={{ color, fontSize: "1.25rem", fontWeight: "bold" }}>
          Atria IT ISE Department
        </Typography>
      </Box>
      <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
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
            error={usernameError || !!wrongUsername}
            helperText={usernameErrorMessage || wrongUsername}
            id="username"
            type="text"
            name="username"
            placeholder="username"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={usernameError || wrongUsername ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: "baseline" }}>
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError || !!wrongPass}
            helperText={passwordErrorMessage || wrongPass}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError || wrongPass ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Box>
    </Card>
  );
}
