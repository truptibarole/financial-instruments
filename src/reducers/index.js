import { combineReducers } from 'redux';

const initialState = {
  loading: true
};

const config = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CONFIG_SUCCESS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  config
});

export default rootReducer;