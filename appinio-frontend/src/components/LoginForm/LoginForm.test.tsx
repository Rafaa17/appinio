import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LoginForm from "./LoginForm";

test("renders LoginForm component", () => {
  render(<LoginForm onLogin={() => {}} />);
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Sign In")).toBeInTheDocument();
});

test("handles input changes and calls onLogin", async () => {
  const onLoginMock = jest.fn();

  render(<LoginForm onLogin={onLoginMock} />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  fireEvent.click(screen.getByText("Sign In"));

  await waitFor(() => {
    expect(onLoginMock).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });
});

test("handles empty input and does not call onLogin", async () => {
  const onLoginMock = jest.fn();

  render(<LoginForm onLogin={onLoginMock} />);

  fireEvent.click(screen.getByText("Sign In"));

  await waitFor(() => {
    expect(onLoginMock).not.toHaveBeenCalled();
  });
});
