import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import BookLesson from '../components/BookLesson';

jest.mock('axios');

describe('BookLesson', () => {
  test('renders BookLesson component and submits form', async () => {
    axios.post.mockResolvedValueOnce({});
    render(
      <MemoryRouter initialEntries={['/book/1']}>
        <Route path="/book/:instructorId" component={BookLesson} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-06-01' } });
    fireEvent.click(screen.getByText(/Book/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/book_lesson/1', { date: '2024-06-01' });
    });
  });

  test('displays error message on API failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Booking failed'));

    render(
      <MemoryRouter initialEntries={['/book/1']}>
        <Route path="/book/:instructorId" component={BookLesson} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-06-01' } });
    fireEvent.click(screen.getByText(/Book/i));

    await waitFor(() => {
      expect(screen.getByText(/Booking failed/i)).toBeInTheDocument();
    });
  });
});
