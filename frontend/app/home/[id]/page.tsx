"use client";
import ClubDetails from "@/app/components/ClubDetails";
import SkeletonList from "@/app/components/SkeletonList";
import { AuthContext } from "@/app/contexts/AuthContext";
import useFetch from "@/app/hooks/useFetch";
import isClubDetail, { ClubDetail } from "@/app/utils/isClubDetail";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

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
  const { data, error, loading } = useFetch(`/clubs/${clubId}`);
  useEffect(() => {
    console.log(data);
    if (data && isClubDetail(data)) setClub(data);
    else console.log("not being converted to club detail");
    
  }, [data]);
  return (
    <div className="w-full">
      {loading ? (
        <div>
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

// about,
//   contact,
//   contactName,
//   fee,
//   hasApplied,
//   id,
//   pasActiveMembers,
//   title,
