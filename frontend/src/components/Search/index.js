import { useSelector, useDispatch  } from "react-redux";
import {useParams, NavLink, useHistory}  from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getDevs} from '../../store/search'
import compareAsc from "date-fns/compareAsc";
import "./Search.css"

function Search() {
  const history = useHistory()
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.search.value);
  const {type} = useParams()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [message, setMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  console.log('I made a change')
  useEffect(() => {
    const errors = [];
    if (
      compareAsc(Date.parse(startTime), Date.parse(endTime)) !== -1
      || compareAsc(Date.parse(startTime), Date.parse(endTime)) === 0
    ) {
      errors.push(
        "Please select an end time that is after the current date and time"
      );
    }
    setValidationErrors([...errors])
    console.log(validationErrors);
  }, [startTime, endTime])

  // todo  send to thunk, query for data, add it to the store, render the display page of developers with a button to pick one

  async function handleSubmit(e) {
    e.preventDefault()

    const criteria = {
      type,
      startTime,
      endTime,
      message
    }

    const devs = dispatch(getDevs(criteria))
    if (devs) {
      history.push('/viewDevs')
    }
  }


  return (
    <div>
      <h2 className="title">{type}</h2>
      <span className="title-sub">{type} not the right language?</span>{" "}
      <span className="title-subLink">
        <NavLink to="/">Pick another language</NavLink>
      </span>
      <div className="buildGroup">
        <h3 className="buildGroup-title">Developer Options</h3>
        <ul className="errors">
          {validationErrors.map((e) => <li className="error" key={e}>{e}</li>)}
        </ul>
        <div className="buildGroup-form">
          <form onSubmit={handleSubmit}>
            <ul className="buildGroup-lengthList">
              <li className="buildGroup-startTime">
                <p>
                  <input
                    type="datetime-local"
                    id="startingTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    min={new Date()}
                    required
                  />
                  {"  "}
                  When do you want to start?
                </p>
              </li>
              <li className="buildGroup-endTime">
                <p>
                  <input
                    type="datetime-local"
                    id="startingTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                  {"  "}
                  When do you want to end your development session?
                </p>
              </li>
              <p>
                <textarea
                  className="buildGroup-message"
                  placeholder="Provide a summary of what you need done for your Tasker. Be sure to be as descriptive as you can..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="28"
                  rows="5"
                ></textarea>
              </p>
            </ul>
            <button
              type="submit"
              disabled={validationErrors.length > 0 ? true : false}
            >
              {" "}
              Find your Dev!
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Search
