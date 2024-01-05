import { useEffect, useState } from "react";
import { getTours } from "../api/getTours";
import { Tour, UseFetchTour } from "../entities/entities";

export const useFetchTour = (): UseFetchTour => {
  const [information, setInformation] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getInformation = async () => {
    const getInfo = await getTours();
    setInformation(getInfo);
    setLoading(false);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return {
    loading,
    information,
    setInformation,
    getInformation,
  };
};
