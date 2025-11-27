import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./counter";

test("increments count when button is clicked", () => {
  render(<Counter />);

  // get the elements
  const countElement = screen.getByTestId("count");
  const button = screen.getByRole("button", { name: /increase/i });

  // initial state check
  expect(countElement.textContent).toBe("Count: 0");

  // simulate click
  fireEvent.click(button);

  // after click
  expect(countElement.textContent).toBe("Count: 1");
});