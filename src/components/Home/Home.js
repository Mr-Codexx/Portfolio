import React from "react";
import { Link } from "react-router-dom";
import Dashboard from '../../pages/Home'

function Home(props) {
  return (
    <div>
      <Dashboard/>

      <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
    </div>
  );
}

export default Home;
