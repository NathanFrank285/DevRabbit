import "./Profile.css"
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProfile } from "../../store/profile";
import { completeTask, getTasks } from "../../store/task";
import compareAsc from "date-fns/compareAsc";


const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [completedTask, setCompletedTask] = useState('')

  useEffect(() => {
    dispatch(fetchProfile(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTasks(id))
  })

  useEffect(()=>{
    if (!completedTask === "") {
      dispatch(completeTask(completedTask));
    }
  },[dispatch, completedTask])

//todo tasks are being saved into the profile store, I should be grabbing them from the task redux store instead of profile

  const user = useSelector((state) => {
    return state.profile.user;
  });
  const tasks = useSelector((state) => {
    return state.profile.tasks;
  });
  const reviews = useSelector((state) => {
    return state.profile.reviews;
  });
  const reviewers = useSelector((state) => {
    return state.profile.reviewers;
  });

  if (!user || !tasks || !reviews || !reviewers) {
    return null;
  }

  function reviewerName(review) {
    return reviewers.find((reviewer) => {
    return reviewer.id === review.clientId
  })};

  const completed = tasks.filter((task) => task.completed)
  const notCompleted = tasks.filter((task) => !task.completed)

  return (
    <div className="profilePage">
      <div className="profilePage-userDetails">
        <h2>Welcome to {user.fullName}'s profile!</h2>
        <div className="profilePage-fullName">{user.fullName}</div>
        <div className="profilePage-bio">{user.biography}</div>
        <div className="profilePage-username">{user.username}</div>
        <div className="profilePage-specialty">{user.specialty}</div>
        <div className="profilePage-rate">${user.hourlyRate}</div>
      </div>

      <div className="profilePage-Reviews">
        <h2>Reviews</h2>
        {reviews?.map((review) => {
          return (
            <div className="reviewBlock" key={review.id}>
              <div className="profilePage-reviewDate">
                Review left on {new Date(review.createdAt).toDateString()}
              </div>
              <div className="profilePage-title">{review.title}</div>
              <div className="profilePage-body">{review.body}</div>

              <div className="profilePage-reviewer">
                - {reviewerName(review).fullName}
              </div>
            </div>
          );
        })}
      </div>
      <div className="profilePage-tasks">
        {/* show video link if session and profile page owner have a pending task */}
        {!notCompleted && <h2>No current tasks</h2>}
        {notCompleted && <h2>Current tasks</h2>}
        {tasks &&
          notCompleted?.map((task) => {
            return (
              <div className="profilePage-currentTasks">
                <p>{`Started on: ${new Date(
                  task.startTime
                ).toDateString()}`}</p>
                <p>{`Due on: ${new Date(task.endTime).toDateString()}`}</p>
                <p>{`Client inquiry: ${task.message}`}</p>
                {compareAsc(new Date(task.endTime), new Date()) === -1 &&
                !task.completed ? (
                  <button onClick={(e) => setCompletedTask(task.id)}>
                    Complete task
                  </button>
                ) : null}
              </div>
            );
          })}
      </div>
      <div className="profilePage-completedTasks">
        {/* show video link if session and profile page owner have a pending task */}
        {!completed && <h2>No completed tasks</h2>}
        {completed && <h2>Completed tasks</h2>}
        {completed?.map((task) => {
          return (
            <div className="profilePage-currentTasks">
              <p>{`Started on: ${new Date(task.startTime).toDateString()}`}</p>
              <p>{`Due on: ${new Date(task.endTime).toDateString()}`}</p>
              <p>{`Client inquiry: ${task.message}`}</p>
              {compareAsc(new Date(task.endTime), new Date()) === 1 &&
              !task.completed ? (
                <button onClick={(e) => setCompletedTask(task.id)}>
                  Complete task
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
