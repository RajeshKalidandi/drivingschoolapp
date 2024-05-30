export const FETCH_SCHOOLS = 'FETCH_SCHOOLS';
export const FETCH_SCHOOLS_SUCCESS = 'FETCH_SCHOOLS_SUCCESS';

export const fetchSchools = () => ({
  type: FETCH_SCHOOLS,
});

export const fetchSchoolsSuccess = (schools) => ({
  type: FETCH_SCHOOLS_SUCCESS,
  payload: schools,
});
