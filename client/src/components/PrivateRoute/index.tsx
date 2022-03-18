import { Redirect, Route, RouteProps } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  ...rest
}: RouteProps) {
  const token = window.localStorage.getItem("accessToken");
  const userRole = window.localStorage.getItem("userRole");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.path === "/admin" && userRole !== "1") {
          return <Redirect to="/" />;
        }
        if (token && Component) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
