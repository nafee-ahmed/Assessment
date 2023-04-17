"use client";
import { useContext } from "react";
import ClubList from "../components/ClubList";
import SkeletonList from "../components/SkeletonList";
import { AuthContext } from "../contexts/AuthContext";

// A bug on react server component
// could make the list as server component,
// however currently there is no way to use cookies on
// react server component
// https://github.com/vercel/next.js/issues/45371
const HomePage = () => {
  const { id } = useContext(AuthContext);
  return !id ? (
    <div>
      <SkeletonList />
    </div>
  ) : (
    <>
      <ClubList url='/clubs' />
    </>
  );
};

export default HomePage;
