import { Redirect, Route, RouteProps } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  ...rest
}: RouteProps) {
  const token = window.localStorage.getItem("accessToken");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token && Component) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
