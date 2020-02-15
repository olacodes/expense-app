import React, { useState, useEffect } from "react";

import {
  Avatar,
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  TextField
} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


import useStyles from "./Styles";
import Copyright from "../../components/copyright";
import CustomizedSnackbars from "../../components/toast";

const axios = require("axios").default;
const jwtDecode = require("jwt-decode");

function LogIn(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(loggedIn);
  }, [loggedIn]);

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post("https://expense-prod.herokuapp.com/api/login/", {
        username: username,
        password: password
      })
      .then(function(response) {
        if (response.status === 200) {
          const token = response.data.token.access;
          const decodedToken = jwtDecode(token);
          const user_id = decodedToken.user_id;
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("token", token);
          setLoggedIn(200);
          setOpen(true);
          setTimeout(() => {
            props.history.push({
              pathname: "/dashboard"
            });
          }, 600);
        }
      })
      .catch(function(error) {
        setLoggedIn(400);
        setOpen(true);
      });
  };

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };
  const onChangePassword = event => {
    setPassword(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      {loggedIn === 200 ? (
        <CustomizedSnackbars
          open={open}
          severity={"success"}
          msg="login successfull"
        />
      ) : loggedIn === 400 ? (
        <CustomizedSnackbars
          open={open}
          severity={"error"}
          msg={"Your login credentials are invalid"}
        />
      ) : null}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} method="post">
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={onChangeUsername}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LogIn;
