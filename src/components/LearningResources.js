import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LearningResources() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/learning_resources')
      .then(response => {
        setResources(response.data);
      })
      .catch(() => {
        setError('Failed to load learning resources');
      });
  }, []);

  return (
    <div>
      <h1>Learning Resources</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {resources.map(resource => (
          <div className="list-group-item" key={resource.id}>
            <h5>{resource.title}</h5>
            <p>{resource.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningResources;
