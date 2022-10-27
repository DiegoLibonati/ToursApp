import React from "react";
import { CardTour } from "./CardTour";
import { useFetchTour } from "../hooks/useFetchTour";
import { useFetchTourReload } from "../hooks/useFetchTourReload";

export const Main = () => {
  const { information, setInformation, loading } = useFetchTour();
  const { saveTours, loadingReload } = useFetchTourReload();

  return (
    <>
      <main>
        <section className="title_container">
          <article className="title_container_article">
            {information.length === 0 ? (
              <>
                <h1>No Tours Left</h1>
                <button onClick={() => setInformation([...saveTours])}>
                  Refresh
                </button>
              </>
            ) : (
              <>
                <h1>Our Tours</h1>
                <div></div>
              </>
            )}
          </article>
        </section>

        <section className="cards_container">
          {loading || loadingReload ? (
            <div className="spinner"></div>
          ) : (
            information.map((tour) => (
              <CardTour
                key={tour.id}
                {...tour}
                information={information}
                setInformation={setInformation}
                loading={loading}
              ></CardTour>
            ))
          )}
        </section>
      </main>
    </>
  );
};
