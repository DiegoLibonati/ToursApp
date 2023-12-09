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
2. CSS3

## Video

https://user-images.githubusercontent.com/99032604/199139972-fd1cf2b4-ddd9-4850-a440-2d3d0acaf0af.mp4

## Documentation

In the `helpers/getTours.js` file there is a function called `getTours()` that builds the structure of an API call that will give us information about the Tours:

```
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
```

In the CustomHook called `useFetchTour()` we are going to use the helper function we created to make the API call and modify the `information and loading` states for its use:

```
import { useEffect, useState } from "react";
import { getTours } from "../helpers/getTours";

export const useFetchTour = () => {
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInformation = async () => {
    const getInfo = await getTours();
    setInformation(getInfo);
    setLoading(false);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return {
    information,
    setInformation,
    loading,
  };
};
```

In the CustomHook called `useFetchTourReload()` it will do the same but when a button is pressed:

```
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
```

In the `CardTour.jsx` component we will have some logic. First we take the variable `newDescription` in which we will divide the information when there is a point. Then there is a `description` state that will receive the first index of the previously generated array and finally a state of the text of a button called `buttonRead`. In the `handleReadText()` function if the state has the summarized information it will add all the information and change the button text and if it is the other way around it will do the opposite. Finally in handleDeleteTour it will delete that Tour from all Tours:

```
const newDescription = info.split(".");
const [description, setDescription] = useState(`${newDescription[0]}...`);
const [buttonRead, setButtonRead] = useState("Read More");

const handleReadText = (e) => {
    if (description === `${newDescription[0]}...`) {
        setDescription(info);
        setButtonRead("Read Less");
    } else {
        setDescription(`${newDescription[0]}...`);
        setButtonRead("Read More");
    }
};

const handleDeleteTour = (e) => {
    const cardContainer = e.target.parentElement;
    for (let i = 0; i < information.length; i++) {
        if (information[i].id === cardContainer.id) {
            information.splice(i, 1);
        }
    }

    return setInformation([...information]);
};
```
