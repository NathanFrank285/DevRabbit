const SEARCH = "session/setSearchValue"

export const taskType = (task) => {
  return {
    type: SEARCH,
    task
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

    default:
      return state;
  }
};

export default searchReducer;
