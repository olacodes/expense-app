import React from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container
} from "@material-ui/core";

import useStyles from "./styles";
import Copyright from "../../components/copyright";

export default function LandingPage(props) {
  const classes = useStyles();

  const handleLoginRoute = () => {
    props.history.push("/login");
  };

  const handleSignUpRoute = () => {
    props.history.push("/register");
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} id="hero">
          <Container maxWidth="sm">
            <div className="hero-text">
              <Typography
                component="h1"
                variant="h3"
                align="center"
                gutterBottom
              >
                TM---EXPENSE
              </Typography>
              <Typography variant="h5" align="center" paragraph gutterBottom>
                TM--Expense app is online expense reporting software,
                tailor-made for businesses worldwide to automate expense report
                creation, streamline approvals and make swift reimbursements.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={3} justify="center">
                  <Grid item>
                    <Button
                      onClick={handleLoginRoute}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      login
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignUpRoute}
                      variant="contained"
                      color="default"
                      size="large"
                    >
                      sign up
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
            <Copyright />
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
