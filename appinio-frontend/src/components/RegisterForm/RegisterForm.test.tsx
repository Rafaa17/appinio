import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RegisterForm from "./RegisterForm";

test("renders RegisterForm component", () => {
  render(<RegisterForm onRegister={() => {}} />);
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
});

test("handles input changes and calls onRegister", async () => {
  const onRegisterMock = jest.fn();

  render(<RegisterForm onRegister={onRegisterMock} />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const emailInput = screen.getByPlaceholderText("Email");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });

  fireEvent.click(screen.getByText("Register"));

  await waitFor(() => {
    expect(onRegisterMock).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    });
  });
});

test("handles empty input and does not call onRegister", async () => {
  const onRegisterMock = jest.fn();

  render(<RegisterForm onRegister={onRegisterMock} />);

  fireEvent.click(screen.getByText("Register"));

  await waitFor(() => {
    expect(onRegisterMock).not.toHaveBeenCalled();
  });
});
