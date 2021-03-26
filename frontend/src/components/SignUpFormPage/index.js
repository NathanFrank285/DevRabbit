import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignUpForm.css";

function SignupFormPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state=>state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) {return (<Redirect to="/" />) }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password ===  confirmPassword) {
    setErrors([])
    return dispatch(sessionActions.signup({username, email, password}))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      })
    }
    return setErrors(["Please confirm that both password and confirm password match"])
  }

  return (
    <>
      <ul className={"errors"}>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </label>
        <label> Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Password"}
            required
          ></input>
        </label>
        <label> Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={"Confirm Password"}
            required
          ></input>
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );

}
export default SignupFormPage;
