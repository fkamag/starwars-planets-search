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

  test('FilterByName', async () => {
    render(<App />);
    const searchElement = screen.getByPlaceholderText('Search here')
    expect(searchElement).toBeInTheDocument();
    expect(searchElement).toHaveValue('');
    userEvent.type(searchElement, 'oo');
    expect(searchElement).toHaveValue('oo');
    const itemTable = await screen.findAllByText('Naboo');
    expect(itemTable).toHaveLength(1);
    const item2Table = screen.queryByText('Alderaan');
    expect(item2Table).not.toBeInTheDocument();
  });

  test('FilterByNumber', async () => {
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

    let listFilters = screen.getAllByTestId('filter');
    expect(listFilters).toHaveLength(1);
    
    const textListFilters = screen.getAllByText('diameter');
    expect(textListFilters).toHaveLength(2);

    expect(columnSearch).toHaveValue('population');
    userEvent.selectOptions(columnSearch, 'orbital_period');
    expect(columnSearch).toHaveValue('orbital_period');
    expect(comparisonSearch).toHaveValue('maior que');
    userEvent.selectOptions(comparisonSearch, 'maior que');
    expect(comparisonSearch).toHaveValue('maior que');
    expect(valueSearch).toHaveValue(0);
    userEvent.type(valueSearch, '350');
    expect(valueSearch).toHaveValue(350);
    userEvent.click(buttonFilter);
    listFilters = screen.getAllByTestId('filter');
    expect(listFilters).toHaveLength(2);

    expect(columnSearch).toHaveValue('population');
    userEvent.selectOptions(columnSearch, 'population');
    expect(columnSearch).toHaveValue('population');
    expect(comparisonSearch).toHaveValue('maior que');
    userEvent.selectOptions(comparisonSearch, 'igual a');
    expect(comparisonSearch).toHaveValue('igual a');
    expect(valueSearch).toHaveValue(0);
    userEvent.type(valueSearch, '30000000');
    expect(valueSearch).toHaveValue(30000000);
    userEvent.click(buttonFilter);
    listFilters = screen.getAllByTestId('filter');
    expect(listFilters).toHaveLength(3);

    const itemTable = await screen.findAllByText('Endor');
    expect(itemTable).toHaveLength(1);
    const item2Table = screen.queryByText('Alderaan');
    expect(item2Table).not.toBeInTheDocument();

    let deleteButton = screen.queryAllByRole('button', { name: /excluir/i });
    expect(deleteButton).toHaveLength(3);
    userEvent.click(deleteButton[0]);
    deleteButton = screen.queryAllByRole('button', { name: /excluir/i });
    expect(deleteButton).toHaveLength(2);

    const removeAllButton = screen.getByRole('button', { name: /remove All Filter/i });
    expect(removeAllButton).toBeInTheDocument();
    userEvent.click(removeAllButton);
    deleteButton = screen.queryAllByRole('button', { name: /excluir/i });
    expect(deleteButton).toHaveLength(0);

    const sortButton = screen.getByRole('button', { name: /sort/i });
    expect(sortButton).toBeInTheDocument();
    userEvent.click(sortButton);
  });

  test('Sort', async () => {
    render(<App />);
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();

    const ascOption = screen.getByTestId('column-sort-input-asc');
    const descOption = screen.getByTestId('column-sort-input-desc');
    expect(ascOption).toBeInTheDocument();
    expect(descOption).toBeInTheDocument();

    const buttonSort = screen.getByTestId('column-sort-button');
    expect(buttonSort).toBeInTheDocument();

    expect(columnSort).toHaveValue('population');
    userEvent.selectOptions(columnSort, 'diameter');
    expect(columnSort).toHaveValue('diameter');
    userEvent.click(descOption);
    userEvent.click(buttonSort);
    let itemTable = await screen.findAllByTestId('planet-name');
    console.log(itemTable[0]);
    // expect(itemTable[0]).toBe('Bespin');
    userEvent.click(ascOption);
    userEvent.click(buttonSort);
    itemTable = await screen.findAllByTestId('planet-name');
    console.log(itemTable[0]);
    // expect(itemTable[0]).toBe('Endor');
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
