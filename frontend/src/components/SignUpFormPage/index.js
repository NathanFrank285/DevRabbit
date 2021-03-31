import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignUpForm.css";

function SignUpFormPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state=>state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState("");
  const [biography, setBiography] = useState("");
  const [hourlyRate, setHourlyRate] = useState(7.25);
  const [specialty, setSpecialty] = useState("");
  const [videoLink, setVideoLink] = useState("");

  if (sessionUser) {return (<Redirect to="/" />) }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password ===  confirmPassword) {
    setErrors([])
    return dispatch(sessionActions.signup({username, email, password, fullName, biography, hourlyRate, specialty, videoLink}))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      })
    }
    return setErrors(["Please confirm that both password and confirm password match"])
  }

  return (
    <div>
      <ul className={"errors"}>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form className="formContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={"Full Name"}
          required
        ></input>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          ></input>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
            required
          ></input>


          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Password"}
            required
          ></input>


          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={"Confirm Password"}
            required
          ></input>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder={"Enter a Bio"}
            required
          ></textarea>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder={"Hourly Rate"}
            
          ></input>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder={"Coding language"}
          ></input>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder={"Video conference link"}
          ></input>
        <button type="submit">Create account</button>
      </form>
    </div>
  );

}
export default SignUpFormPage;
