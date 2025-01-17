import React, { useEffect, useState } from "react";

interface CardTourProps {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
  handleDeleteTour: React.MouseEventHandler<HTMLButtonElement>;
}

export const CardTour = ({
  id,
  name,
  info,
  image,
  price,
  handleDeleteTour,
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

  useEffect(() => {
    const newDescription: string[] = info.split(".");
    setDescription(`${newDescription[0]}...`);
  }, []);

  return (
    <article className="card" id={id}>
      <img src={image} alt={name}></img>
      <div className="card__title">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
      <p className="card__description">
        {description}
        <button id="readmore" onClick={handleReadText} aria-label="read action">
          {buttonRead}
        </button>
      </p>
      <button
        type="button"
        id="delete-btn"
        onClick={handleDeleteTour}
        aria-label="not interested tour"
      >
        Not Interested
      </button>
    </article>
  );
};
