import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AddPost from "./AddPost";

test("renders AddPost component", () => {
  const onSummarizeMock = jest.fn();
  const onCreateMock = jest.fn();

  render(<AddPost onCreate={onCreateMock} onSummarize={onSummarizeMock} />);
  expect(screen.getByPlaceholderText("Enter Content")).toBeInTheDocument();
  expect(screen.getByText("Summarize")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
});

test("handles content input and calls onSummarize", async () => {
  const onSummarizeMock = jest.fn();

  render(
    <AddPost onSummarize={onSummarizeMock} onCreate={() => Promise.resolve()} />
  );

  const contentTextarea = screen.getByPlaceholderText("Enter Content");
  fireEvent.change(contentTextarea, { target: { value: "Test content" } });

  fireEvent.click(screen.getByText("Summarize"));

  await waitFor(() => {
    expect(onSummarizeMock).toHaveBeenCalledWith("Test content");
  });
});

test("handles content input, summary, and insights and calls onCreate", async () => {
  const onCreateMock = jest.fn();

  render(
    <AddPost
      onSummarize={() => Promise.resolve()}
      onCreate={onCreateMock}
      summary="Test summary"
      insights="Test insights"
    />
  );

  const contentTextarea = screen.getByPlaceholderText("Enter Content");
  fireEvent.change(contentTextarea, { target: { value: "Test content" } });

  fireEvent.click(screen.getByText("Create"));

  await waitFor(() => {
    expect(onCreateMock).toHaveBeenCalledWith("Test content");
  });
});
