import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommunityReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/community_reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(() => {
        setError('Failed to load reviews');
      });
  }, []);

  return (
    <div>
      <h1>Community Reviews</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {reviews.map(review => (
          <div className="list-group-item" key={review.id}>
            <h5>{review.learner.username}</h5>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityReviews;
