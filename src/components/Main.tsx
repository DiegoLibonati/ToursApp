import { CardTour } from "./CardTour";
import { useFetchTour } from "../hooks/useFetchTour";

export const Main = (): JSX.Element => {
  const { information, loading, setInformation, getInformation } =
    useFetchTour();

  return (
    <main>
      <section className="title_container">
        <article className="title_container_article">
          {information.length === 0 ? (
            <>
              <h1>No Tours Left</h1>
              <button onClick={() => getInformation()}>Refresh</button>
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
        {loading ? (
          <div className="spinner"></div>
        ) : (
          information.map((tour) => (
            <CardTour
              key={tour.id}
              {...tour}
              information={information}
              setInformation={setInformation}
            ></CardTour>
          ))
        )}
      </section>
    </main>
  );
};
