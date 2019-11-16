import React from "react";
import { Redirect, Route } from "react-router-dom";
import AdminLayout from "components/utils/AdminLayout";

export default function protectedRoute({ isAuth, isAdmin, user, ...props }) {
  const { component: Component, tab } = props;
  return (
    <Route
      {...props}
      component={props =>
        isAdmin ? (
          user.role === "admin" ? (
            <AdminLayout tab={tab}>
              <Component {...props} />
            </AdminLayout>
          ) : (
            <Redirect to="/posts" {...props} />
          )
        ) : user.role === "member" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/page-not-found" {...props} />
        )
      }
    />
  );
}
