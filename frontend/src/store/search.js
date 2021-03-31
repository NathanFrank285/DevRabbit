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
  const response = await fetch("/api/devs", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(criteria),
  });

  if (response.ok) {
    //todo take devs, dispatch to reducer then grab the devs object in the view devs, filter accordingly
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
      devList.devs = action.devs
      return devList

    default:
      return state;
  }
};

export default searchReducer;
