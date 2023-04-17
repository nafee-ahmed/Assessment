"use client";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SucessAuthMessage } from "../models/ApiTypes";
import { backendLink } from "../utils/constants";

export const useAuth = () => {
  const router = useRouter();

  const { authDispatch, error, loading, user } = useContext(AuthContext);

  const loginHandler = async (
    e: React.FormEvent,
    loginCredentials: { email: string; password: string }
  ) => {
    e.preventDefault();
    authDispatch?.({ type: "AUTH_START" });
    try {
      const res = await axios.post(
        backendLink + "/auth/login",
        loginCredentials
      );
      const data: SucessAuthMessage = res.data;
      authDispatch?.({ type: "AUTH_SUCCESS", payload: data.access_token });
      router.replace("/home");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const message = err.response?.data.message;
        authDispatch?.({ type: "AUTH_FAILURE", payload: message });
        console.log(err);
      }
      console.log(err);
    }
  };

  const signupHandler = async (signupDetails: {
    email: string;
    password: string;
    name: string;
  }) => {
    authDispatch?.({ type: "AUTH_START" });
    try {
      const res = await axios.post(backendLink + "/user", signupDetails);
      const data: SucessAuthMessage = res.data;
      authDispatch?.({ type: "AUTH_SUCCESS", payload: data.access_token });
      router.replace("/home");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const code = err.response?.data.statusCode;
        code === 422
          ? authDispatch?.({
              type: "AUTH_FAILURE",
              payload: err.response?.data.message,
            })
          : authDispatch?.({
              type: "AUTH_FAILURE",
              payload: err.response?.data.message[0],
            });
      }
      console.log(err);
    }
  };

  const logout = async () => {
    localStorage.clear();
    authDispatch?.({ type: "LOGOUT" });
    router.replace("/");
  };

  return {
    loginHandler,
    signupHandler,
    error,
    loading,
    user,
    logout,
  };
};
