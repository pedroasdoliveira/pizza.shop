import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "../SignIn";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Paths } from "@/routes";

describe("Sign in", () => {
  it("should set default email input value if email is present on search params", () => {
    const { debug, getByText, getByLabelText } = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <HelmetProvider>
            <MemoryRouter
              initialEntries={[`${Paths.SIGN_IN}?email=johndoe@example.com`]}
            >
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        );
      },
    });

    //debug();

    const emailInput = getByLabelText("Seu e-mail") as HTMLInputElement;

    //console.log(emailInput.outerHTML);

    expect(emailInput.value).toEqual("johndoe@example.com");
  });
});
