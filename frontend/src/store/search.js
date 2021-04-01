import { csrfFetch } from "./csrf"



const SEARCH = "session/setSearchValue"
const GET_DEVS = "session/getDevs"

export const taskType = (task) => {
  return {
    type: SEARCH,
    task
  }
}
export const load = (devs) => {
  return {
    type: GET_DEVS,
    devs
  }
}

export const saveTask = (task) => {
  //todo use csrfFetch to post it to the database
}

export const getDevs = (criteria) => async dispatch => {
  const {type, startTime, endTime} = criteria
  const response = await csrfFetch(`/api/search/${type}/${startTime}/${endTime}`);
  //add csrf fetch
  if (response.ok) {
    const data = await response.json()
    // const searchResponse = {...criteria, response: res}
    dispatch(load(data.devs));
    // return searchResponse;
  }
}

const initialState = { user: null };

const searchReducer = (state = initialState, action) => {
  let newTask;
  switch (action.type) {
    case SEARCH:

      newTask = Object.assign({}, state);
      newTask.value = action.task;
      return newTask;
    case GET_DEVS:
      console.log('logging');
      const devList = {...state, devs: action.devs}
      return devList

    default:
      return state;
  }
};

export default searchReducer;
