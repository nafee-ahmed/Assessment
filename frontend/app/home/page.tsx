"use client";
import { useContext } from "react";
import ClubList from "../components/ClubList";
import SkeletonList from "../components/SkeletonList";
import { AuthContext } from "../contexts/AuthContext";

// A bug on react server component
// I wanted to make the list as server component,
// since there is not much interactivity
// It is recommended to use server component whenever there is little interactivity
// since server components are faster
// however currently there is no way to use cookies on
// react server component and it's a bug on Nextjs.13, so 
// I had to turn it to client components. 
// https://github.com/vercel/next.js/issues/45371
const HomePage = () => {
  const { id } = useContext(AuthContext);
  return !id ? (
    <div className="w-full">
      <SkeletonList />
    </div>
  ) : (
    <>
      <ClubList url='/clubs' />
    </>
  );
};

export default HomePage;
