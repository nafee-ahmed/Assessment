import React, { Suspense, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Club } from "../models/ApiTypes";
import { isArrayOfClubs } from "../utils/isArrayOfClubs";
import ClubItem from "./ClubItem";
import SkeletonList from "./SkeletonList";
import Spinner from "./Spinner";

interface Props {
  url: string;
}

const ClubList: React.FC<Props> = ({ url }) => {
  const { data, error, loading } = useFetch(url);
  const [clubs, setClubs] = useState<Club[]>([]);
  useEffect(() => {
    if (isArrayOfClubs(data)) setClubs(data);
  }, [data]);
  const emptyText: { [key: string]: string } = {
    "/clubs/applied": "Still loading or Apply to Jobs from the Job List",
    "/clubs": "Still loading or Populate the DB by clicking Populate",
  };

  return loading ? (
    <div>
      <SkeletonList />
    </div>
  ) : (
    <Suspense fallback={<Spinner />}>
      {clubs.length === 0 ? (
        <div className="text-center text-gray-400">{emptyText[url]}</div>
      ) : (
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 mb-10 md:w-4/5 mx-auto"
          >
            {clubs.map((club) => (
              <li key={club.id} className="py-3 sm:py-4 cursor-pointer group">
                <ClubItem club={club} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Suspense>
  );
};

export default ClubList;
