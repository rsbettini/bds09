import { Redirect, Route } from "react-router-dom";
import { isAuthenticated, Role } from "util/auth";

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  console.log("Acesso ao private com rota: " + path);
  console.log("Acesso ao private com children: " + children?.toLocaleString);
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
