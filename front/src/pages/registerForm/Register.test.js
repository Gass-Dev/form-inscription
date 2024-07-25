import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "./Register";

describe("RegistrationForm", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders the form with all input fields and submit button", () => {
    render(<RegistrationForm />);

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Postal Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Birth Date")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(<RegistrationForm />);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");

    const lastNameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput.value).toBe("Doe");

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput.value).toBe("john.doe@example.com");

    const cityInput = screen.getByPlaceholderText("City");
    fireEvent.change(cityInput, { target: { value: "Paris" } });
    expect(cityInput.value).toBe("Paris");

    const postalCodeInput = screen.getByPlaceholderText("Postal Code");
    fireEvent.change(postalCodeInput, { target: { value: "75000" } });
    expect(postalCodeInput.value).toBe("75000");

    const birthDateInput = screen.getByLabelText("Birth Date");
    fireEvent.change(birthDateInput, { target: { value: "2000-01-01" } });
    expect(birthDateInput.value).toBe("2000-01-01");
  });

  test("submits the form with correct data", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { value: "75000" },
    });
    fireEvent.change(screen.getByLabelText("Birth Date"), {
      target: { value: "2000-01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(
      await screen.findByText("User registered successfully")
    ).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          birthDate: "2000-01-01",
          city: "Paris",
          postalCode: "75000",
        }),
      })
    );
  });

  test("shows error message on failed registration", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { value: "75000" },
    });
    fireEvent.change(screen.getByLabelText("Birth Date"), {
      target: { value: "2000-01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(
      await screen.findByText("Error registering user")
    ).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          birthDate: "2000-01-01",
          city: "Paris",
          postalCode: "75000",
        }),
      })
    );
  });
});
