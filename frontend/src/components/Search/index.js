// import 'Search.css'
import { useSelector, useDispatch } from "react-redux";
import {useParams, NavLink}  from 'react-router-dom'
import {useState, useEffect} from 'react'
import compareAsc from "date-fns/compareAsc";

function Search() {
  const searchValue = useSelector((state) => state.search.value);
  const {type} = useParams()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [message, setMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = [];
    console.log(startTime)
    if (
      compareAsc(Date.parse(startTime), Date.parse(endTime)) !== -1
      // compareAsc(Date.parse(startTime), Date.parse(endTime)) === 0
    ) {
      validationErrors.push(
        "please select an end time that is after the current date and time"
      );
    }
    setValidationErrors([...errors])
  }, [startTime, endTime])

  function handleSubmit(e) {
    e.preventDefault()

    if (compareAsc(Date.parse(startTime), Date.parse(endTime)) !== -1){
      validationErrors.push("please select an end time that is after the current date and time")
    };


    const search = {
      type,
      startTime,
      endTime,
      message
    }
    //todo grab the date info, check that startdate is before the end date, else render errors. if it passes errors, send to thunk, query for data, add it to the store, render the display page of developers with a button to pick one
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
          {validationErrors && validationErrors.map((e) => <li key={e}>{e}</li>)}
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
