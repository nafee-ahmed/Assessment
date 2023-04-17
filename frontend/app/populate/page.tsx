"use client";
import axios from "axios";
import React, { useState } from "react";
import { BsTypeH1 } from "react-icons/bs";
import { backendLink } from "../utils/constants";

const PopulatePage = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const populateHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendLink}/clubs`);
      console.log(res.data);
      setDone(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={populateHandler}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none "
      >
        Populate DB
      </button>
      {done && <h1>Done!</h1>}
    </div>
  );
};

export default PopulatePage;
