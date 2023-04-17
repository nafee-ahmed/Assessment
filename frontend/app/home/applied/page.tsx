"use client";
import ClubList from "@/app/components/ClubList";
import { AuthContext } from "@/app/contexts/AuthContext";
import React, { useContext } from "react";

const AppliedPage: React.FC = () => {
  return <ClubList url="/clubs/applied" />;
};

export default AppliedPage;
