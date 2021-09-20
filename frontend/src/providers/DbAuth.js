import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext, createContext } from "react";
import { getUser } from "../api/users";

const authContext = createContext();

export function ProvideDbAuth({ children }) {
  const auth = useProvideDbAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideDbAuth() {
  const [dbUser, setDbUser] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      getUser(user.sub, user.email, user.name).then((x) => setDbUser(x));
    }
  }, [user]);

  return {
    dbUser,
  };
}
