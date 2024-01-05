import { Tour } from "../entities/entities";

export const getTours = async (): Promise<Tour[]> => {
  const url: string = "https://course-api.com/react-tours-project";

  const request = await fetch(url);

  const data: Tour[] = await request.json();

  const tours = data.map((tour) => ({
    id: tour.id,
    name: tour.name,
    info: tour.info,
    image: tour.image,
    price: tour.price,
  }));

  return tours;
};
