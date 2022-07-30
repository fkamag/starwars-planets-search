import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  expect(searchElement).toHaveValue('');
  userEvent.type(searchElement, 'Tatooine');
  expect(searchElement).toHaveValue('Tatooine');
});

test('FilterByNumber', () => {
  render(<App />);
  const columnSearch = screen.getByTestId('column-filter');
  expect(columnSearch).toBeInTheDocument();
  expect(columnSearch).toHaveValue('population');
  userEvent.selectOptions(columnSearch, 'diameter');
  expect(columnSearch).toHaveValue('diameter');

  const comparisonSearch = screen.getByTestId('comparison-filter');
  expect(comparisonSearch).toBeInTheDocument();
  expect(comparisonSearch).toHaveValue('maior que');
  userEvent.selectOptions(comparisonSearch, 'igual a');
  expect(comparisonSearch).toHaveValue('igual a');

  const valueSearch = screen.getByTestId('value-filter');
  expect(valueSearch).toBeInTheDocument();
  expect(valueSearch).toHaveValue(0);
  userEvent.type(valueSearch, '10');
  expect(valueSearch).toHaveValue(10);
});