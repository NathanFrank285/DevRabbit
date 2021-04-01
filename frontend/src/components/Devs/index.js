import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {saveTask} from '../../store/search'
import "./Devs.css"

const Devs = () => {

  const dispatch = useDispatch()
  // const user = useSelector((state)=> (state.session.user ? new Object(state.session) : null ))
  // const criteria = useSelector((state)=> (state.search ? new Object(state.search.criteria) : null ))
  const devs= useSelector((state)=> state.search.devs)
  // const startTime = useSelector(state => state.search.criteria.startTime)
  // const endTime = useSelector(state => state.search.criteria.endTime)
  const [developerId, setDeveloperId] = useState('')
  console.log(devs);



  const onSubmit = () => {

    const createJob = ({
      // startTime: criteria.startTime,
      // endTime: criteria.endTime,
      // message: criteria.message,

    })
    //todo create the newTask thunk to post a new job to the back end and redirect to the profile page where we can confirm if a job is complete or not
    // dispatch(saveTask(createJob))

  }
  let content;
if (devs) {
  content = devs.map((dev) => (
    <div className="profile" key={dev.id}>
        <div className="profile-name">{dev.fullName}</div>
        <div className="profile-bio">{dev.biography}</div>
        {/* <div className="profile-image"></div> */}
        <input type="hidden" value={developerId}  />
        <buttton onClick={(e)=>setDeveloperId((e.target.value))}>Confirm Dev</buttton>
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
