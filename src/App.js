import React from "react";
import { Route } from 'react-router-dom'
import Home from './Home'
import Form from './Form'


const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Route exact path='/'>
      <Home />
        </Route>
      <Route path='/pizza'>
        <Form />
      </Route>
    </>
  );
};
export default App;
