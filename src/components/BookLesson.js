import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function BookLesson() {
  const { instructorId } = useParams();
  const [date, setDate] = useState('');
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/book_lesson/${instructorId}`, { date })
      .then(() => {
        history.push('/dashboard');
      })
      .catch(() => {
        setError('Booking failed');
      });
  };

  return (
    <div>
      <h1>Book Lesson</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Book</button>
      </form>
    </div>
  );
}

export default BookLesson;
