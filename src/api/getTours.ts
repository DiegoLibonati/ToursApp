import { Tour } from "@src/entities/entities";

export const getTours = async (): Promise<Tour[]> => {
  const request = await fetch("/react-tours-project");

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
