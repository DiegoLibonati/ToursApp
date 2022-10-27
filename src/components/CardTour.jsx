import React, { useState } from "react";

export const CardTour = ({
  id,
  name,
  info,
  img,
  price,
  information,
  setInformation,
}) => {
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

  return (
    <>
      <article className="card_container" id={id}>
        <img src={img} alt={name}></img>
        <div className="card_container_title">
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
        <p className="text-card">
          {description}
          <button
            id="readmore"
            onClick={(e) => handleReadText(e)}
            pointerEvents="none"
          >
            {buttonRead}
          </button>
        </p>
        <button
          type="button"
          id="delete-btn"
          onClick={(e) => handleDeleteTour(e)}
        >
          Not Interested
        </button>
      </article>
    </>
  );
};
