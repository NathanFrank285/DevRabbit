import { csrfFetch } from "./csrf";


const SAVE_NEW_TASK = 'task/saveNewTask'
const COMPLETE_TASK = 'task/completeTask'
const CURRENT_TASKS = "task/currentTasks"

const storeNewTask = (task) => {
  return {
    type: SAVE_NEW_TASK,
    task
  }
}

const myTasks = (tasks) => {
  return {
    type: CURRENT_TASKS,
    tasks
  }
}

// const completeTask = (task) => {
//   return {
//     type: COMPLETE_TASK,
//     task
//   }
// }

export const getTasks = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${userId}`)
  if (response.ok) {
    const res = await response.json();
    dispatch(myTasks(res));
  }
}


export const completeTask = (taskId) => async (dispatch) => {
  const response = await csrfFetch("/api/tasks/update", {
    method: "PUT",
    body: JSON.stringify({
      taskId
    }),
  });
  if (response.ok) {
    const res = await response.json();
    dispatch(storeNewTask(res))
  }
}




export const saveTask = (task) => async (dispatch) => {
  //todo use csrfFetch to post it to the database
  const {
    clientId,
    developerId,
    message,
    startTime,
    endTime,
    pending,
    completed
  } = task
  const response = await csrfFetch("/api/tasks/new", {
    method: "POST",
    body: JSON.stringify({
      clientId,
      developerId,
      message,
      startTime,
      endTime,
      pending,
      completed
    }),
  });
  if (response.ok) {
    const data = await response.json();
    // const searchResponse = {...criteria, response: res}
    dispatch(storeNewTask(data));
  }

};

const initialState = {}
const taskReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SAVE_NEW_TASK:
      newState = {...state};
      newState.newTask = action.task;
      console.log(newState);
      return newState;
    case CURRENT_TASKS:
      newState = {...state};
      newState.currentTasks = action.task
      return newState
    default:
      return state;
  }
};
export default taskReducer
