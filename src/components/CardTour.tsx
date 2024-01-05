import React, { useEffect, useState } from "react";
import { CardTourProps } from "../entities/entities";

export const CardTour = ({
  id,
  name,
  info,
  image,
  price,
  information,
  setInformation,
}: CardTourProps): JSX.Element => {
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

  return (
    <article className="card_container" id={id}>
      <img src={image} alt={name}></img>
      <div className="card_container_title">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
      <p className="text-card">
        {description}
        <button
          id="readmore"
          onClick={(e) => handleReadText(e)}
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
  );
};
