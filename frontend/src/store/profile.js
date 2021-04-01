const LOAD_PROFILE = "profile/getProfile";
export const loadProfile = (profile) => {
  return {
    type: LOAD_PROFILE,
    profile,
  };
};


export const fetchProfile = (id) => async dispatch => {

  const response = await fetch(`/api/profile/${id}`)
}


export default profileReducer;
