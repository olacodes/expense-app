import React, {useState} from 'react';

import { 
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
  Link, Grid, Box, Typography, Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Copyright from '../../components/copyright';
import useStyles from './Styles'
import CustomizedSnackbars from '../../components/toast';

const axios = require('axios')
const jwtDecode = require('jwt-decode')


function SignUp(props) {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState(null)

  const handleName = ((event) => {setName(event.target.value)})
  const handleUsername = ((event) => {setUsername( event.target.value)})
  const handlePassword = ((event) => {setPassword( event.target.value)})
  const handleEmail = ((event) => {setEmail(event.target.value)})

  const handleRegister = ((event) => {
    event.preventDefault()
    axios.post('https://expense-prod.herokuapp.com/api/register/', {
      username: username,
      password: password,
      email: email,
      name: name
    })
    .then(function (response) {
      setMessage(response.data.message)
      setStatus(response.status)
      setOpen(true)

      const token = response.data.token.access
      const refreshToken = response.data.token.refresh
      const decodedToken = jwtDecode(token)
      const user_id = (decodedToken.user_id);

      localStorage.setItem('token', token)
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('refreshToken', refreshToken)

      setTimeout(() => {
        props.history.push({
          pathname: '/dashboard',
      })        
      }, 1000);
      
    })
    .catch(function(error){
      setStatus(error.response.status);
      setMessage(error.response.data.message)
      setOpen(true)
    });
    setStatus('')
  })

  return (
    <Container component="main" maxWidth="xs">
      {status === 201 ? (
        <CustomizedSnackbars
          open={open}
          severity={"success"}
          msg={message}
        />
      ) : status === 400 ? (
        <CustomizedSnackbars
          open={open}
          severity={"error"}
          msg={message}
        />
      ) : null}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleRegister} method='POST'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={20}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp