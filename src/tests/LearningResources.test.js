import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import LearningResources from '../components/LearningResources';

jest.mock('axios');

const mockStore = configureStore([thunk]);

describe('LearningResources', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      resources: { resources: [] },
    });
  });

  test('renders LearningResources component', () => {
    render(
      <Provider store={store}>
        <LearningResources />
      </Provider>
    );

    expect(screen.getByText(/Learning Resources/i)).toBeInTheDocument();
  });

  test('displays learning resources on successful API call', async () => {
    const resources = [{ id: 1, title: 'Resource Title', content: 'Resource Content' }];
    axios.get.mockResolvedValueOnce({ data: resources });

    render(
      <Provider store={store}>
        <LearningResources />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Resource Title/i)).toBeInTheDocument();
      expect(screen.getByText(/Resource Content/i)).toBeInTheDocument();
    });
  });

  test('handles API failure gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Provider store={store}>
        <LearningResources />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load learning resources/i)).toBeInTheDocument();
    });
  });
});
