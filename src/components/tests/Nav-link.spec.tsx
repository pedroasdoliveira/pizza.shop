import { render } from "@testing-library/react";
import NavLink from "../NavLink";
import { MemoryRouter } from "react-router-dom";

describe("Nav link component", () => {
  it("should highlight the nav link when is the current page link", () => {
    const { debug, getByText } = render(
      <>
        <NavLink to={"/"}>Home</NavLink>

        <NavLink to={"/about"}>About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    // debug();

    expect(getByText("Home").dataset.current).toEqual("false");
    expect(getByText("About").dataset.current).toEqual("true");
  });
});
