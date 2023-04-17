"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import MovingNavbar from "../components/MovingNavbar";
import TopNavbar from "../components/TopNavbar";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { backendLink } from "../utils/constants";

interface Props {
  children: React.ReactNode;
}

const NavbarLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { authDispatch } = useContext(AuthContext);

  // This function just redirects user to the login page whenever the user reloads with
  // an expired token
  // The token expires after 60s for added security
  async function fetchUser() {
    const token = localStorage.getItem("user");
    if (token) {
      const res = await fetch(`${backendLink}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        const json = await res.json();
        authDispatch?.({ type: "ADD_USER", payload: json.message.id });
      } else {
        console.log(res);
        router.replace("/");
      }
    } else {
      console.log("no token");
      router.replace("/");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // The layout page in here has the navbars so all the children pages
  // from this path inherits the navbar.
  return (
    <div>
      <TopNavbar />
      <div className="px-smallSidePadding md:p-mediumSidePadding lg:px-bigSidePadding mb-20 ">
        {children}
      </div>
      <div className=" md:hidden fixed bottom-0 z-50 w-full">
        <MovingNavbar />
      </div>
    </div>
  );
};

export default NavbarLayout;
