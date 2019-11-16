import React from "react";
import { Link } from "react-router-dom";

import Button from "components/utils/Button";
import "./style.css";

function Home(props) {
  return (
    <section className="home">
      <p className="home--desc">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      </p>
      <div className="home--register">
        <Link to="/login">
          <Button className="home--button">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="home--button">Create Profile</Button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
