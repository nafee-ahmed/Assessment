import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {  backendLink } from "../utils/constants";

// useFetch is a custom hook used for fetching data
// This hook is reused every time data is fetched such as to render the list of clubs
const useFetch = (url: string) => {
  const [data, setData] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendLink}${url}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")!}`,
            "Content-Type": "application/json",
          },
        });
        setData(res.data.message);
      } catch (error: unknown) {
        console.log(error);
        setError(true);
        router.replace("/");
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
