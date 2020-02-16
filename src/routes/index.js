import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import NavBar from '../components/navBar';

const Dashboard = lazy(() => import("../containers/Dashboard/dashboard"))
const LandingPage = lazy(() => import("../containers/LandingPage/index"))
const LogIn = lazy(() => import("../containers/LogIn/LogIn"));
const SignUp = lazy(() => import('../containers/SignUp/SignUp'));


export default function App(){
    return (
        <Suspense
            fallback={
                <Box display='flex' justifyContent='center' marginTop='300px'>
                    <CircularProgress size='150px' color='primary'/>
                </Box>
            }
        >
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/register" component={SignUp} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>

        </Suspense>
    )
}