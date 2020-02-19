import React from "react";
import Moment from 'react-moment'
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Table,
  TableBody,
  Button,
  TableRow,
  TableCell,
  TableHead
} from "@material-ui/core";
import Title from "./titles";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders(props) {
  const expenses = props.expenses;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Recent Expense</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Added</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses &&
            expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell><Moment format="D-MM-YYYY HH:mm">{expense.date_added}</Moment></TableCell>
                <TableCell>{expense.reason}</TableCell>
                <TableCell align="right">&#x00023;{expense.value}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="contained" color="primary">
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => props.removeExpense(expense)}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
