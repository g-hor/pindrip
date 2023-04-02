import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index'
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <>
      <h1>hey wassup welcome to pindrip</h1>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
