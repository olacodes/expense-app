import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  const lastItem = expense.length -1
  const recentExpense = expense[lastItem]
  

  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Recent expense</Title>
      <Typography component="p" variant="h5">
        #{recentExpense && recentExpense.value}
      </Typography>

      <Typography variant='h5' component='p' color='secondary' gutterBottom>
        {recentExpense && recentExpense.reason}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {recentExpense && recentExpense.last_modified}
        
      </Typography>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}