import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSchools, fetchSchoolsSuccess } from '../redux/actions';
import axios from 'axios';

function SearchDrivingSchools() {
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools.schools);

  useEffect(() => {
    dispatch(fetchSchools());
    axios.get('/api/driving_schools')
      .then(response => {
        dispatch(fetchSchoolsSuccess(response.data));
      })
      .catch(() => {
        // Handle error
      });
  }, [dispatch]);

  return (
    <div>
      <h1>Search Driving Schools</h1>
      <div className="row">
        {schools.map(school => (
          <div className="col-md-4" key={school.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{school.name}</h5>
                <p className="card-text">{school.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDrivingSchools;
