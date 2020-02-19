import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment'
import Title from './titles';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({expense}) {
  
  const recentExpense = expense[0]
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Recent expense</Title>
      <Typography component="p" variant="h5">
        &#x00023; {recentExpense && recentExpense.value}
      </Typography>

      <Typography variant='h5' component='p' color='secondary' gutterBottom>
          {recentExpense && recentExpense.reason}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        <Moment format="YY-MM-DD HH:mm">
        {recentExpense && (recentExpense.last_modified)}  
        </Moment>

      </Typography>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}