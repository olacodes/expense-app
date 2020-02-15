import React from 'react';
import { render } from '@testing-library/react';
import App from './routes/index';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/tm---expense/i);
  expect(linkElement).toBeInTheDocument();
});
