import { createContext, useEffect } from "react";
import {
  getToken,
  getUserData,
  logoutAPI,
  refreshToken,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from "../helpers/helpers";
import {
  APIResponseInterface,
  LoginContext,
  PropsInterface,
} from "../helpers/interfaces";
import { useUser } from "../hooks/useUser";

export const AuthContext: React.Context<LoginContext> =
  createContext<LoginContext>({
    auth: undefined,
    login: () => {},
    logout: () => {},
    refresh: () => {},
  });

export const AuthProvider: React.FC<PropsInterface> = ({
  children,
}): JSX.Element => {
  const [auth, setAuth] = useUser();
  const contextValue = {
    auth,
    login: async (response: APIResponseInterface) => {
      if (response.response && response.token !== undefined) {
        setToken(response.token);
        const userData = await getUserData(response.token);
        if (userData.data !== undefined) {
          setUser(userData.data.username);
          setAuth(userData.data);
        }
      } else {
        console.log(response.message);
      }
    },
    logout: async () => {
      const token = getToken();
      if (token !== null && auth !== null && auth !== undefined) {
        const response = await logoutAPI(token);
        if (response.response && response.redirect !== undefined) {
          removeToken();
          removeUser();
          window.location.replace(response.redirect);
        }
      }
    },
    refresh: async () => {
      const newToken = await refreshToken();
      if (newToken.response && newToken.token !== undefined) {
        setToken(newToken.token);
      }
    },
  };
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token !== null) {
        const userData = await getUserData(token);
        if (userData.data !== undefined) {
          setUser(userData.data.username);
          setAuth(userData.data);
        } else {
          await contextValue.refresh();
          window.location.reload();
        }
      } else {
        setAuth(null);
      }
    })();
  }, []);
  return auth === undefined ? (
    <div />
  ) : (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
