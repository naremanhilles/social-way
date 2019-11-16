import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default props => (
  <>
    <section className="not-found">
      <span className="not-found--msg">Oops! That page can’t be found.</span>
      <span className="not-found--code">404</span>
      <Link to={props.to} className="not-found--back-home">
        Back to Home Page
      </Link>
    </section>
  </>
);
