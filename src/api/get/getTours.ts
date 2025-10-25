import { GetToursResponse } from "@src/entities/responses";

export const getTours = async (): Promise<GetToursResponse> => {
  try {
    const response = await fetch("/react-tours-project");

    if (!response.ok) {
      throw new Error("Error fetching tours.");
    }

    const data: GetToursResponse = await response.json();

    return data;
  } catch (e) {
    throw new Error(`Error fetching tours: ${e}.`);
  }
};
