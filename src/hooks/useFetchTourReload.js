import { useEffect, useState } from "react";
import { getTours } from "../helpers/getTours";

export const useFetchTourReload = () => {
  const [saveTours, setSaveTours] = useState([]);
  const [loadingReload, setLoadingReload] = useState(true);

  const getInformation = async () => {
    const getInfo = await getTours();
    setSaveTours(getInfo);
    setLoadingReload(false);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return {
    saveTours,
    loadingReload,
  };
};
