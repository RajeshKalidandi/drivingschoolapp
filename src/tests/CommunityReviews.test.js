import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import CommunityReviews from '../components/CommunityReviews';

jest.mock('axios');

const mockStore = configureStore([thunk]);

describe('CommunityReviews', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      reviews: { reviews: [] },
    });
  });

  test('renders CommunityReviews component', () => {
    render(
      <Provider store={store}>
        <CommunityReviews />
      </Provider>
    );

    expect(screen.getByText(/Community Reviews/i)).toBeInTheDocument();
  });

  test('displays reviews on successful API call', async () => {
    const reviews = [{ id: 1, learner: { username: 'Learner' }, rating: 5, comment: 'Great!' }];
    axios.get.mockResolvedValueOnce({ data: reviews });

    render(
      <Provider store={store}>
        <CommunityReviews />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Learner/i)).toBeInTheDocument();
      expect(screen.getByText(/Great!/i)).toBeInTheDocument();
    });
  });

  test('handles API failure gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Provider store={store}>
        <CommunityReviews />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load reviews/i)).toBeInTheDocument();
    });
  });
});
