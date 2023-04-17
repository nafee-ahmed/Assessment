"use client";
import ClubDetails from "@/app/components/ClubDetails";
import SkeletonList from "@/app/components/SkeletonList";
import { AuthContext } from "@/app/contexts/AuthContext";
import useFetch from "@/app/hooks/useFetch";
import isClubDetail, { ClubDetail } from "@/app/models/isClubDetail";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

// This page corresponds to the url: "/home/{clubId}"
// to render the details of the selected club
const ClubDetailsPage = () => {
  const params = useParams();
  const clubId = parseInt(params.id);
  const [club, setClub] = useState<ClubDetail>({
    about: "",
    contact: "",
    contactName: "",
    fee: 0,
    hasApplied: false,
    pastActiveMembers: 0,
    title: "",
    id: 0,
  });
  // reusing useFetch custom hook to fetch the details.
  const { data, error, loading } = useFetch(`/clubs/${clubId}`);
  useEffect(() => {
    console.log(data);
    if (data && isClubDetail(data)) setClub(data);
    else console.log("not being converted to club detail");
  }, [data]);
  return (
    <div>
      {loading ? (
        <div className="w-full ">
          <SkeletonList />
        </div>
      ) : (
        <ClubDetails
          about={club.about}
          contact={club.contact}
          contactName={club.contactName}
          fee={club.fee}
          hasApplied={club.hasApplied}
          id={club.id}
          pasActiveMembers={club.pastActiveMembers}
          title={club.title}
        />
      )}
    </div>
  );
};

export default ClubDetailsPage;
