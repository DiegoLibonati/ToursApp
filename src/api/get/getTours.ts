import { Tour } from "@src/entities/app";

export const getTours = async (): Promise<Tour[]> => {
  try {
    const response = await fetch("/react-tours-project");

    if (!response.ok) {
      throw new Error("Error fetching tours.");
    }

    const data: Tour[] = await response.json();

    const tours = data.map((tour) => ({
      id: tour.id,
      name: tour.name,
      info: tour.info,
      image: tour.image,
      price: tour.price,
    }));

    return tours;
  } catch (e) {
    throw new Error(`Error fetching tours: ${e}.`);
  }
};
