import { screen, render, cleanup } from "@testing-library/react";
import Button from "../Button";

afterEach(() => {
  cleanup();
});
test("Button Render Test Test", () => {
  const mockText = "test-1";
  render(<Button text={mockText} size={20} />);

  const expectedButton = screen.getByTestId("button");

  expect(expectedButton).toBeInTheDocument();
  expect(expectedButton).toHaveTextContent(mockText);
});
