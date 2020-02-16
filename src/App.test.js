import React from 'react';
import { render } from '@testing-library/react';
import App from './routes/index';
import Login from './containers/LogIn/LogIn'
import SignUp from './containers/SignUp/SignUp';
import AddExpense from './containers/Expense/AddExpense';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/tm---expense/i);
  expect(linkElement).toBeInTheDocument();
});

test('it renders username and password fields', () => {
  const { getByLabelText } = render(<Login />);
  const password = getByLabelText(/password/i);
  const username = getByLabelText(/username/i);
  expect(password).toBeInTheDocument();
  expect(username).toBeInTheDocument();
});


test('it renders username, name, email and password fields', () => {
  const { getByLabelText } = render(<SignUp />);
  const password = getByLabelText(/password/i);
  const username = getByLabelText(/user name/i);
  const email = getByLabelText(/email address/i);

  expect(password).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(email).toBeInTheDocument();

});

test('it renders reason and value fields', () => {
  const { getByLabelText } = render(<AddExpense />);
  const value = getByLabelText(/value/i);
  const reason = getByLabelText(/reason/i);
  expect(value).toBeInTheDocument();
  expect(reason).toBeInTheDocument();
});