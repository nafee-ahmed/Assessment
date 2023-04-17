"use client";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthActions, AuthState } from "../models/AuthContextTypes";
import { AuthReducer } from "../reducers/AuthReducer";

export const INITIAL_STATE = {
  user:
    (typeof window !== "undefined" &&
      localStorage.getItem("user") as string) ||
    "",
  loading: false,
  error: null,
  id: null,
  authDispatch: () => null,
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

interface Props {
  children: ReactNode;
}
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.getItem("user") === undefined && localStorage.clear();
    localStorage.setItem("user", authState.user!);
  }, [authState.user]);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        authDispatch,
        id: authState.id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
