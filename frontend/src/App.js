import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import TaskSearch from "./components/TaskSearch";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Footer from "./components/Footer";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <TaskSearch />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route exact path="/search/:type">
            <Search />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      )}
      <Footer/>
    </>
  );
}

export default App;
