import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  Divider,
  Box,
  AppBar,
  Button,
  Toolbar,
  List,
  Typography,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper
} from "@material-ui/core/";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { mainListItems, secondaryListItems } from "./listItems";
import Deposits from "./deposits";
import Orders from "./orders";
import Copyright from "../../components/copyright";
import useStyles from "./styles";
import CustomizedSnackbars from "../../components/toast";

const axios = require("axios");

export default function Dashboard(props) {
  
  const [expense, setExpense] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  
  const [open, setOpen] = useState(false)
  
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(true);
  
  // Retrieve Token and userId from the local storge
  const token = localStorage.getItem("token");
  const user_id = parseInt(localStorage.getItem("user_id"));

  let data = [];

  useEffect(() => {
    async function fetchUserExpense() {
      const response = await axios({
        method: "get",
        url: `https://expense-prod.herokuapp.com/api/${user_id}/expense`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }).catch(err => {
        setOpen(true)
        setMessage('please login')
        props.history.push("/login");
        return;
      });
      if (response) {
        setExpense(response.data);
      }
    }
    fetchUserExpense();
  }, [user_id, token, props.history]);

  if (expense) {
    data = expense;
  }

  const removeExpense = expense => {
    const expenseData = data.filter(i => i.id !== expense.id);
    setExpense(expenseData);
    axios
      .delete(
        `https://expense-prod.herokuapp.com/api/${user_id}/expense/${expense.id}/delete/`
      )
      .then(response => {
        if (response.status === 204) {
          console.log(response);
          
          setMessage('Item deleted');
          setStatus(response.status);
          setOpen(true)
          setDrawerOpen(false)
        }
      })
      .catch(error => {
        setMessage(error.response.message);
        setStatus(error.response.status)
        setOpen(true)
      });
      setOpen(true)
  };


  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogOut = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    props.history.push("/");
  };

  const handleAddExpense = () => {
    props.history.push("/add-expense");
  };

  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label=" drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExpense}
            className={classes.addExpense}
          >
            + Add Expense
          </Button>
          <Button variant="contained" color="primary" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits expense={data} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders expenses={data} removeExpense={removeExpense} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4} mt={10}>
            <Copyright color={'primary'}/>
          </Box>
        </Container>
        {status >= 200 && status < 400 ? (
        <CustomizedSnackbars open={open} severity={"error"} msg={message} />
      ) : status === 400 ? (
        <CustomizedSnackbars open={open} severity={"error"} msg={message} />
      ) : true
    }
      </main>
    </div>
  );
}
