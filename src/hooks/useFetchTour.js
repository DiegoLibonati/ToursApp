import { useEffect, useState } from "react";
import { getTours } from "../helpers/getTours";

export const useFetchTour = () => {
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInformation = async () => {
    const getInfo = await getTours();
    setInformation(getInfo);
    setLoading(false);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return {
    information,
    setInformation,
    loading,
  };
};
