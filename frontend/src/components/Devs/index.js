import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {saveTask} from '../../store/task'
import "./Devs.css"

const Devs = ({type, message, startTime, endTime}) => {

  const dispatch = useDispatch()
  const user = useSelector((state)=> state.session.user)
  const devs= useSelector((state)=> state.search.devs)
  const [developerId, setDeveloperId] = useState('')


  async function onSubmit(e) {
    e.preventDefault()

    const createJob = ({
      clientId: user.id,
      developerId: Number(developerId),
      message,
      startTime,
      endTime,
      pending: true,
      completed: false
    })
    //todo create the newTask thunk to post a new job to the back end and redirect to the profile page where we can confirm if a job is complete or not

    const response = await dispatch(saveTask(createJob))
  }
  let content;
if (devs) {
  content = devs.map((dev) => (
    <div className="profile" key={dev.id}>
       <form onSubmit={onSubmit}>
          <div className="profile-name">{dev.fullName}</div>
          <div className="profile-bio">{dev.biography}</div>
          <div className="profile-completedTasks">I've completed # of {dev.specialty} tasks!</div>
          {/* <div className="profile-image"></div> */}
          <input type="hidden" value={developerId}  />
          <NavLink to={`/api/profile/${dev.id}`}><button value={dev.id} onClick={(e)=>setDeveloperId((e.target.value))}>Confirm Dev</button></NavLink>
       </form>
    </div>
  ));


}

  return (
    <div className="devContainer">
      {content}
    </div>
  );

};
export default Devs;
