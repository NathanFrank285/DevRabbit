const SEARCH = "session/setSearchValue"
const SEARCH_DEVS = "session/getDevs"

export const taskType = (task) => {
  return {
    type: SEARCH,
    task
  }
}
export const load = (devs) => {
  return {
    type: SEARCH_DEVS,
    devs
  }
}

export const getDevs = (criteria) => async dispatch => {
  const {type} = criteria
  const response = await fetch(`/api/search/${type}`);
  if (response.ok) {
    const res = await response.json()
    const searchResponse = {...criteria, response: res}
    dispatch(load(searchResponse));
    return searchResponse;
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
    case SEARCH_DEVS:
      const devList = Object.assign({}, state)
      devList.criteria = action.devs
      devList.res = action.devs.response
      return devList

    default:
      return state;
  }
};

export default searchReducer;
