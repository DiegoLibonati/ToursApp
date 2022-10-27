export const getTours = async () => {
  const url = "https://course-api.com/react-tours-project";

  let resp = await fetch(url);

  let data = await resp.json();

  const tours = data.map((tour) => ({
    id: tour.id,
    name: tour.name,
    info: tour.info,
    img: tour.image,
    price: tour.price,
  }));

  return tours;
};
