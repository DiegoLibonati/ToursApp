import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { CardTour } from "./CardTour";

type RenderComponent = {
  props: {
    id: string;
    name: string;
    info: string;
    image: string;
    price: string;
    handleDeleteTour: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    id: "id1",
    name: "Tour 1",
    info: "Spec. Description2",
    image: "image.png",
    price: "12",
    handleDeleteTour: jest.fn(),
  };

  const { container } = render(
    <CardTour
      id={props.id}
      image={props.image}
      info={props.info}
      name={props.name}
      price={props.price}
      handleDeleteTour={props.handleDeleteTour}
    ></CardTour>
  );

  return {
    container: container,
    props: props,
  };
};

describe("CardTour.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the image, the title, the price, the description, the read more button and the 'Not Interested' button.", () => {
      const { props } = renderComponent();

      const img = screen.getByRole("img");
      const headingName = screen.getByRole("heading", {
        name: props.name,
      });
      const price = screen.getByText(`$${props.price}`);
      const description = screen.getByText(`${props.info.split(".")[0]}...`);
      const buttonReadAction = screen.getByRole("button", {
        name: /read action/i,
      });
      const buttonNotInterested = screen.getByRole("button", {
        name: /not interested/i,
      });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", props.image);
      expect(img).toHaveAttribute("alt", props.name);

      expect(headingName).toBeInTheDocument();

      expect(price).toBeInTheDocument();

      expect(description).toBeInTheDocument();

      expect(buttonReadAction).toBeInTheDocument();

      expect(buttonNotInterested).toBeInTheDocument();
    });

    test("When you click on the 'Read More' button it should show the full description. In case you tap 'Read Less' it should show the description in halves.", async () => {
      const { props } = renderComponent();

      const lessDescription = `${props.info.split(".")[0]}...`;
      const completeDescription = props.info;

      const buttonReadAction = screen.getByRole("button", {
        name: /read action/i,
      });
      const description = screen.getByText(lessDescription);

      expect(buttonReadAction).toBeInTheDocument();
      expect(buttonReadAction).toHaveTextContent("Read More");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(lessDescription);
      expect(description).not.toHaveTextContent(completeDescription);

      await user.click(buttonReadAction);

      expect(buttonReadAction).toBeInTheDocument();
      expect(buttonReadAction).toHaveTextContent("Read Less");
      expect(description).toBeInTheDocument();
      expect(description).not.toHaveTextContent(lessDescription);
      expect(description).toHaveTextContent(completeDescription);

      await user.click(buttonReadAction);

      expect(buttonReadAction).toBeInTheDocument();
      expect(buttonReadAction).toHaveTextContent("Read More");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(lessDescription);
      expect(description).not.toHaveTextContent(completeDescription);
    });

    test("It must execute the delete Tour function when you tap on the 'handleDeleteTour' button.", async () => {
      const { props } = renderComponent();

      const buttonNotInterested = screen.getByRole("button", {
        name: /not interested/i,
      });

      await user.click(buttonNotInterested);

      expect(props.handleDeleteTour).toHaveBeenCalledTimes(1);
    });
  });
});
