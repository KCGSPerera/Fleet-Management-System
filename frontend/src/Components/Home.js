import React from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

/*const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
} */

function Home() {
  const location = useLocation ()

  return (
    <div className="homepage">
      <h2>Home Page</h2>
      <h1>Hello {location.state.id} and welcome to the home</h1>
    </div>
  )
} 

export default Home;
