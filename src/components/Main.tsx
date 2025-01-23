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
    <main className="main-app">
      <section className="app-header">
        <article className="app-header__content">
          <h1 className="app-header__content-title">
            {loading
              ? "Searching Tours..."
              : tours
              ? "Our Tours"
              : "No Tours Left"}
          </h1>

          <div className="app-header__content-separator"></div>

          {!tours && !loading && (
            <button
              onClick={() => handleGetTours()}
              aria-label="refresh tours"
              className="app-header__content-refresh"
            >
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
