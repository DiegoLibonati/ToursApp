import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { mockTours } from "../tests/jest.constants";
import { createServer } from "../tests/msw/server";

import { Main } from "./Main";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Main></Main>);

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(<Main></Main>);

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

describe("Main.tsx", () => {
  describe("General Tests.", () => {
    createServer([
      {
        path: "/react-tours-project",
        method: "get",
        res: () => {
          return mockTours;
        },
      },
    ]);

    test("It should show the loading, the title 'Searching Tours...' should be rendered when searching for tours.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const loader = container.querySelector(".spinner");
      const heading = screen.getByRole("heading", {
        name: /searching tours.../i,
      });

      expect(loader).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
    });

    test("It should render the title 'Our Tours' and the total number of tours once the tours are loaded.", async () => {
      const { container } = await asyncRenderComponent();

      // eslint-disable-next-line
      const loader = container.querySelector(".spinner");
      const heading = screen.getByRole("heading", {
        name: /our tours/i,
      });
      const imgs = screen.getAllByRole("img");

      expect(loader).not.toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(imgs).toHaveLength(mockTours.length);
    });

    test("It should render the 'No Tours Left' title and the refresh button when there are no more tours.", async () => {
      const { container } = await asyncRenderComponent();

      // eslint-disable-next-line
      const loader = container.querySelector(".spinner");
      const heading = screen.getByRole("heading", {
        name: /our tours/i,
      });
      const notInterestedButtons = screen.getAllByRole("button", {
        name: /not interested/i,
      });

      expect(loader).not.toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(notInterestedButtons).toHaveLength(mockTours.length);

      for (let btn of notInterestedButtons) {
        await user.click(btn);
      }

      const headingNoToursLeft = screen.getByRole("heading", {
        name: /no tours left/i,
      });
      const refreshButtons = screen.getByRole("button", {
        name: /refresh tours/i,
      });

      expect(headingNoToursLeft).toBeInTheDocument();
      expect(refreshButtons).toBeInTheDocument();
    });

    test("It must bring back the tours once you have clicked the Refresh button.", async () => {
      await asyncRenderComponent();

      const notInterestedButtons = screen.getAllByRole("button", {
        name: /not interested/i,
      });

      expect(notInterestedButtons).toHaveLength(mockTours.length);

      for (let btn of notInterestedButtons) {
        await user.click(btn);
      }

      const refreshButtons = screen.getByRole("button", {
        name: /refresh tours/i,
      });

      expect(refreshButtons).toBeInTheDocument();

      await user.click(refreshButtons);

      expect(notInterestedButtons).toHaveLength(mockTours.length);
    });
  });
});
