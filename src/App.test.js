import React from 'react';
import { render } from '@testing-library/react';
import App from './routes/index';
import Login from './containers/LogIn/LogIn'

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
