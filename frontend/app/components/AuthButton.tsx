import React from "react";
import Spinner from "./Spinner";

interface Props {
  type: "Login" | "Sign Up";
  loading?: boolean;
}

const AuthButton: React.FC<Props> = ({ type, loading = false }) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-gradient-to-br from-purple-600 to-primaryColor hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {loading ? <Spinner /> : type}
    </button>
  );
};

export default AuthButton;
