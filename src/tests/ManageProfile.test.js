import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ManageProfile from '../components/ManageProfile';

jest.mock('axios');

describe('ManageProfile', () => {
  test('renders ManageProfile component and updates profile', async () => {
    axios.get.mockResolvedValueOnce({ data: { bio: '', qualifications: '', availability: '' } });
    axios.post.mockResolvedValueOnce({});

    render(<ManageProfile />);

    fireEvent.change(screen.getByLabelText(/Bio:/i), { target: { value: 'New Bio' } });
    fireEvent.change(screen.getByLabelText(/Qualifications:/i), { target: { value: 'New Qualifications' } });
    fireEvent.change(screen.getByLabelText(/Availability:/i), { target: { value: 'New Availability' } });
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/profile', {
        bio: 'New Bio',
        qualifications: 'New Qualifications',
        availability: 'New Availability',
      });
    });
  });

  test('displays error message on profile update failure', async () => {
    axios.get.mockResolvedValueOnce({ data: { bio: '', qualifications: '', availability: '' } });
    axios.post.mockRejectedValueOnce(new Error('Profile update failed'));

    render(<ManageProfile />);

    fireEvent.change(screen.getByLabelText(/Bio:/i), { target: { value: 'New Bio' } });
    fireEvent.change(screen.getByLabelText(/Qualifications:/i), { target: { value: 'New Qualifications' } });
    fireEvent.change(screen.getByLabelText(/Availability:/i), { target: { value: 'New Availability' } });
    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(screen.getByText(/Profile update failed/i)).toBeInTheDocument();
    });
  });
});
