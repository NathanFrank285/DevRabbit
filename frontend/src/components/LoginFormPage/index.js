import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state=>state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  if (sessionUser) {return (<Redirect to='/'/>)}

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])
    return dispatch(sessionActions.login({credential, password}))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      })

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
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          ></input>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Password"}
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </>
  );

}
export default LoginFormPage
