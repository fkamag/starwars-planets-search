import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockAPI from './MockAPI';

describe('Testando projeto Starwars', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(MockAPI) });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
    userEvent.selectOptions(comparisonSearch, 'menor que');
    expect(comparisonSearch).toHaveValue('menor que');

    const valueSearch = screen.getByTestId('value-filter');
    expect(valueSearch).toBeInTheDocument();
    expect(valueSearch).toHaveValue(0);
    userEvent.type(valueSearch, '10000');
    expect(valueSearch).toHaveValue(10000);

    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);

    const listFilters = screen.getByTestId('filter');
    expect(listFilters).toBeInTheDocument();
    
    const textListFilters = screen.getAllByText('diameter');
    expect(textListFilters).toHaveLength(2);
  });

  test('Sort', () => {
    render(<App />);
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();
    expect(columnSort).toHaveValue('population');
    userEvent.selectOptions(columnSort, 'diameter');
    expect(columnSort).toHaveValue('diameter');

    const ascOption = screen.getByTestId('column-sort-input-asc');
    const descOption = screen.getByTestId('column-sort-input-desc');
    expect(ascOption).toBeInTheDocument();
    expect(descOption).toBeInTheDocument();

    const buttonSort = screen.getByTestId('column-sort-button');
    expect(buttonSort).toBeInTheDocument();
  });

  test('Table and API call', async () => {
    render(<App />);
    const theadTable = screen.getByText('Name');
    expect(theadTable).toBeInTheDocument();

    const itemTable = await screen.findByText('Tatooine');
    expect(itemTable).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(1);
  });
})
