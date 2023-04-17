"use client";
import React, { useEffect, useState } from "react";
import cdImg from "../../public/clubDetails.png";
import { FaArrowLeft, FaBriefcase } from "react-icons/fa";
import Image from "next/image";
import Spinner from "./Spinner";
import axios from "axios";
import { backendLink } from "../utils/constants";
import { useRouter } from "next/navigation";

interface Props {
  about: string;
  contact: string;
  contactName: string;
  fee: number;
  hasApplied: boolean;
  id: number;
  pasActiveMembers: number;
  title: string;
}

const clubDetails: React.FC<Props> = ({
  about,
  contact,
  contactName,
  fee,
  hasApplied,
  id,
  pasActiveMembers,
  title,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(hasApplied);
  useEffect(() => {
    setIsDone(hasApplied);
  }, [hasApplied]);
  const router = useRouter();

  const applyHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendLink}/clubs/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      setIsDone(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className="lg:w-4/5 lg:mx-auto">
      <div className="grid grid-cols-10 grid-flow-row w-full mx-auto gap-4">
        <div className="col-span-10 md:col-span-5">
          <Image
            className="rounded-md mt-2 max-w-full max-h-80 object-contain"
            src={cdImg}
            alt="job details"
          />
        </div>
        <div className="flex flex-col gap-1 bg-[#F8F8F8] col-span-10 md:col-span-5 p-4 rounded-lg">
          <span className="text-md text-[#773903]">
            Posted by {contactName}
          </span>
          <h1 className="text-2xl font-bold">{title}</h1>
          <span className="font-light leading-relaxed tracking-wider text-[#707070]">
            {about}
          </span>
          <div className="mt-auto flex justify-between">
            <span className="text-xl font-bold text-[#FF5D15]">${fee}</span>
            <span className="text-lg font-bold">{contact}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 disabled:bg-gray-400 disabled:text-gray-500"
          onClick={applyHandler}
          disabled={isDone}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FaBriefcase size={"1.25rem"} />
              <span className="pl-2">Apply</span>
            </>
          )}
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          onClick={() => router.back()}
        >
          <FaArrowLeft size={"1.25rem"} />
          <span className="pl-2">Back</span>
        </button>
      </div>
    </div>
  );
};

export default clubDetails;
