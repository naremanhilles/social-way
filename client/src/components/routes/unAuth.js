import React from "react";
import { isNotAuthRoutes } from "constants/routes";
import { Login } from "components/pages";
import { Route } from "react-router-dom";

export default handleLogin =>
  isNotAuthRoutes.map(route =>
    route.path === "/login" ? (
      <Route
        {...route}
        render={props => <Login handleLogin={handleLogin} {...props} />}
      />
    ) : (
      <Route {...route} />
    )
  );
