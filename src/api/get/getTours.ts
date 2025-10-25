import { GetToursResponse } from "@src/entities/responses";

export const getTours = async (): Promise<GetToursResponse> => {
  try {
    const response = await fetch("/react-tours-project");

    if (!response.ok) {
      throw new Error("Error fetching tours.");
    }

    const data: GetToursResponse = await response.json();

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
