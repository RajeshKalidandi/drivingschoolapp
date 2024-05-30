import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import SearchDrivingSchools from '../components/SearchDrivingSchools';

jest.mock('axios');

const mockStore = configureStore([thunk]);

describe('SearchDrivingSchools', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      schools: { schools: [] },
    });
  });

  test('renders SearchDrivingSchools component', () => {
    render(
      <Provider store={store}>
        <SearchDrivingSchools />
      </Provider>
    );

    expect(screen.getByText(/Search Driving Schools/i)).toBeInTheDocument();
  });

  test('displays driving schools on successful API call', async () => {
    const schools = [{ id: 1, name: 'Test School', description: 'Description' }];
    axios.get.mockResolvedValueOnce({ data: schools });

    render(
      <Provider store={store}>
        <SearchDrivingSchools />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test School/i)).toBeInTheDocument();
      expect(screen.getByText(/Description/i)).toBeInTheDocument();
    });
  });

  test('handles API failure gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Provider store={store}>
        <SearchDrivingSchools />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load driving schools/i)).toBeInTheDocument();
    });
  });
});
