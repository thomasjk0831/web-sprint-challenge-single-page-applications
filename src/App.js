import React from "react";
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import Form from './Form'


const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <nav>
      <Link to='/'>
        <p>Home Page</p>
      </Link>
      <Link to='/pizza'>
      <p>Order Now</p>
      </Link>
      </nav>
     
      
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
