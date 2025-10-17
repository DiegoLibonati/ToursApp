import React, { useEffect, useState } from "react";

import { Tour } from "@src/entities/app";

import { CardTour } from "@src/components/CardTour/CardTour";

import { getTours } from "@src/api/get/getTours";

import "@src/pages/ToursPage/ToursPage.css";

export const ToursPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteTour = (id: string) => {
    if (tours?.length === 1) return setTours([]);

    return setTours(tours!.filter((tour) => tour.id !== id));
  };

  const handleGetTours = async () => {
    setLoading(true);

    const tours = await getTours();

    setTours(tours);
    setLoading(false);
  };

  useEffect(() => {
    handleGetTours();
  }, []);

  return (
    <main className="tours-page">
      <section className="app-header">
        <article className="app-header__content">
          <h1 className="app-header__title">
            {loading
              ? "Searching Tours..."
              : tours.length > 0
              ? "Our Tours"
              : "No Tours Left"}
          </h1>

          <div className="app-header__separator"></div>

          {(!tours || tours.length === 0) && !loading && (
            <button
              onClick={() => handleGetTours()}
              aria-label="refresh tours"
              className="app-header__btn-refresh"
            >
              Refresh
            </button>
          )}
        </article>
      </section>

      <section className="cards">
        {loading && <div className="spinner"></div>}

        {tours.length > 0 &&
          tours!.map((tour) => (
            <CardTour
              key={tour.id}
              id={tour.id}
              image={tour.image}
              info={tour.info}
              name={tour.name}
              price={tour.price}
              handleDeleteTour={handleDeleteTour}
            ></CardTour>
          ))}
      </section>
    </main>
  );
};
