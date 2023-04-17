"use client";
import Image from "next/image";
import React, { useState } from "react";
import signIn from "../public/signIn.png";
import AuthButton from "./components/AuthButton";
import InputField from "./components/InputField";
import { useAuth } from "./hooks/useAuth";

const LoginPage: React.FC = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const { loginHandler, error, loading } = useAuth();

  return (
    <div className="h-screen flex justify-start items-center">
      <div className="hidden md:block h-full md:flex-grow-3 lg:flex-grow-5">
        <Image
          src={signIn}
          alt="sign in"
          className="h-full w-full object-cover"
        />
      </div>
      {/* form */}
      <div className="w-full mx-8 gap-8 flex flex-col items-start">
        <img
          src="https://matchub.co/wp-content/uploads/2020/03/matchub_blackwords_highres-e1584588152685-2048x1106.png"
          className="w-20 animate-bounce"
          alt=""
        />
        <form
          onSubmit={(e) => loginHandler(e, loginCredentials)}
          className="flex flex-col  w-full gap-3"
        >
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="font-light text-gray-400">
            Connecting students and clubs...
          </p>
          <div>
            <InputField
              label="Email"
              id="email"
              placeholder="john@gmail.com"
              type="email"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })
              }
              isRequired={true}
            />
          </div>
          <div>
            <InputField
              label="Password"
              id="password"
              placeholder="***"
              type="password"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
              isRequired={true}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic">
              Wrong email or password
            </p>
          )}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a
              href="/signup"
              className="font-medium text-primaryColor hover:underline"
            >
              Sign up
            </a>
          </p>
          <div className="my-2">
            <AuthButton type="Login" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
