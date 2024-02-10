# Tours-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that shows different tours, of each tour you can see an image, a title, a price, a description that will have a status to show all the information or a cut out part and finally a button that you are not interested in that tour. In case of touching this button the tour will be deleted from the page.

## Technologies used

1. React JS
2. Typescript
3. CSS3

## Video

https://github.com/DiegoLibonati/Tours-App-Page/assets/99032604/79c95c90-15aa-42ce-a0a2-3d322b3ef493

## Documentation

In the `api/getTours.ts` file there is a function called `getTours()` that builds the structure of an API call that will give us information about the Tours:

```
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
```

In the CustomHook called `useFetchTour()` we are going to use the helper function we created to make the API call and modify the `information and loading` states for its use:

```
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
```

In the `CardTour.tsx` component we will have some logic. First we take the variable `newDescription` in which we will divide the information when there is a point. Then there is a `description` state that will receive the first index of the previously generated array and finally a state of the text of a button called `buttonRead`. In the `handleReadText()` function if the state has the summarized information it will add all the information and change the button text and if it is the other way around it will do the opposite. Finally in handleDeleteTour it will delete that Tour from all Tours:

```
const [description, setDescription] = useState<string>("");
const [buttonRead, setButtonRead] = useState<string>("Read More");

const handleReadText: React.MouseEventHandler<HTMLButtonElement> = () => {
  if (description.includes("...")) {
    setDescription(info);
    setButtonRead("Read Less");
    return;
  }
  setDescription(`${info.split(".")[0]}...`);
  setButtonRead("Read More");
  return;
};

const handleDeleteTour: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  const target = e.target as HTMLElement;
  const cardContainer = target.parentElement;

  const tours = information.filter((tour) => tour.id !== cardContainer?.id);

  return setInformation(tours);
};

useEffect(() => {
  const newDescription: string[] = info.split(".");
  setDescription(`${newDescription[0]}...`);
}, []);
```
