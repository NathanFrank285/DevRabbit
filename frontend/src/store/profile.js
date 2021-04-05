const LOAD_PROFILE = "profile/getProfile";
export const loadProfile = (profile) => {
  return {
    type: LOAD_PROFILE,
    profile,
  };
};


export const fetchProfile = (id) => async dispatch => {

  const response = await fetch(`/api/profile/${id}`)

  if (response.ok){
    const res = await response.json();
    dispatch(loadProfile(res))
  }
}
const initialState = {}

const profileReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_PROFILE:
      newState = Object.assign({}, state);
      return {...newState, ...action.profile};
    default:
      return state;
  }
};


export default profileReducer;
