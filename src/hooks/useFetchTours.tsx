import { useEffect, useState } from "react";

import { Tour } from "../entities/entities";

import { getTours } from "../api/getTours";

type UseFetchTours = {
  loading: boolean;
  tours: Tour[] | null;
  setTours: React.Dispatch<React.SetStateAction<Tour[] | null>>;
  handleGetTours: () => Promise<void>;
};

export const useFetchTours = (): UseFetchTours => {
  const [tours, setTours] = useState<Tour[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetTours = async () => {
    setLoading(true);
    const tours = await getTours();
    setTours(tours);
    setLoading(false);
  };

  useEffect(() => {
    handleGetTours();
  }, []);

  return {
    loading: loading,
    tours: tours,
    setTours: setTours,
    handleGetTours: handleGetTours,
  };
};
