import { FETCH_SCHOOLS_SUCCESS } from '../actions';

const initialState = {
  schools: [],
};

const schoolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOOLS_SUCCESS:
      return { ...state, schools: action.payload };
    default:
      return state;
  }
};

export default schoolsReducer;
