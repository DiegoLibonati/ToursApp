// ##### TYPES #####

export type UseFetchTour = {
  loading: boolean;
  information: Tour[];
  setInformation: React.Dispatch<React.SetStateAction<Tour[]>>;
  getInformation: () => Promise<void>;
};

export type Tour = {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
};

// ##### INTERFACES #####

export interface CardTourProps {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
  information: Tour[];
  setInformation: React.Dispatch<React.SetStateAction<Tour[]>>;
}
