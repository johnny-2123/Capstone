import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginFormPage from "./components/User/LoginFormPage";
import SignupFormPage from "./components/User/SignUpFormPage";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const notify = () => {
    toast('Basic Notfication')
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/">
          <Home notify={notify} />
        </Route>
      </Switch>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
