import { CardTour } from "./CardTour";

import { useFetchTours } from "../hooks/useFetchTours";

export const Main = (): JSX.Element => {
  const { tours, loading, setTours, handleGetTours } = useFetchTours();

  const handleDeleteTour: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    const cardContainer = target.parentElement;

    if (tours?.length === 1) return setTours(null);

    return setTours(tours!.filter((tour) => tour.id !== cardContainer?.id));
  };

  return (
    <main>
      <section className="app__header">
        <article className="app__header__title">
          <h1>
            {loading
              ? "Searching Tours..."
              : tours
              ? "Our Tours"
              : "No Tours Left"}
          </h1>
          <div></div>

          {!tours && !loading && (
            <button onClick={() => handleGetTours()} aria-label="refresh tours">
              Refresh
            </button>
          )}
        </article>
      </section>

      <section className="cards">
        {loading && <div className="spinner"></div>}

        {tours &&
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
