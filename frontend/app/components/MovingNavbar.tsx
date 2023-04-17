"use client";
import { IconType } from "react-icons";
import { BsBookmarkCheck } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

interface NavItem {
  icon: IconType;
  text: string;
  link: string;
  path: string | null;
}

const studentNavItems: NavItem[] = [
  { text: "Job List", icon: FaListUl, link: "/home", path: null },
  {
    text: "Applied",
    icon: BsBookmarkCheck,
    link: "/home/applied",
    path: "applied",
  },
];

const MovingNavbar = () => {
  // useSelectedLayoutSegment is a client component hook that lets me read the active route 
  // segment one level below the layout it is called from
  // Here, it has been used to apply styles to the navbar item that is currently active
  const segment = useSelectedLayoutSegment();

  return (
    <div className="w-full flex justify-between bg-opacity-20 backdrop-blur-sm rounded drop-shadow-lg">
      {studentNavItems.map((item) => (
        <a
          href={item.link}
          key={item.text}
          className="group text-black px-2 md:px-3 py-2 flex flex-col justify-center md:flex-row items-center flex-1 cursor-pointer hover:text-primaryColor hover:rounded-md transition duration-500"
        >
          <item.icon
            size={20}
            className={`mb-1 md:mx-2 group-hover:animate-ping ${
              item.path === segment ? "text-primaryColor" : ""
            }`}
          />
          <span
            className={`text-xs md:text-lg text-center whitespace-nowrap ${
              item.path === segment ? " text-primaryColor" : ""
            }`}
          >
            {item.text}
          </span>
        </a>
      ))}
    </div>
  );
};

export default MovingNavbar;