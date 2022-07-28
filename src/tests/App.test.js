import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Page.js', () => {
  render(<App />);
  const imgElement = screen.getByRole('img', {name: 'logo'});
  expect(imgElement).toBeInTheDocument();
});

test('FilterByName', () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText('Search here')
  expect(searchElement).toBeInTheDocument();
});
