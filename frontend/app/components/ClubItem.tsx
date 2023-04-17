import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTelephone } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import jobImage from "../../public/job.png";
import { Club } from "../models/ApiTypes";

interface Props {
    club: Club
}
// This component is also reused on the 2 pages that has the list, for each item on the list.
const ClubItem: React.FC<Props> = ({ club }) => { 
  return (
    <div>
      <Link href={`/home/${club.id}`}>
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex-shrink-0 self-start">
            <Image
              className="w-9 h-9 rounded-full mt-2"
              src={jobImage}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <p className=" text-sm whitespace-normal md:text-md font-medium text-gray-900 truncate group-hover:underline">
              {club.title}
            </p>
            <div className=" md:pt-2 text-gray-600 text-xs flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-4">
              <div className="flex gap-1">
                <IoMdPeople style={{ fontSize: "1.3em" }} />
                {club.pastActiveMembers}
              </div>
              <div className="flex gap-1">By {club.contactName}</div>
              <div className="flex gap-1">
                <BsTelephone style={{ fontSize: "1.2em" }} />
                {club.contact}
              </div>
            </div>
          </div>
          <div className="inline-flex self-start md:items-center text-lg font-semibold text-gray-900">
            ${club.fee}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClubItem;
