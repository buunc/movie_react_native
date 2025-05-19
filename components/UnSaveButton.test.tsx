import { render, fireEvent } from "@testing-library/react-native";
import UnSaveButton from "./UnSaveButton";

describe("UnSaveButton component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<UnSaveButton onRemove={() => {}} />);
    expect(getByTestId("unsave-btn")).toBeTruthy();
  });

  it("calls onRemove prop when the button is pressed", () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<UnSaveButton onRemove={mockFn} />);
    fireEvent.press(getByTestId("unsave-btn"));
    expect(mockFn).toHaveBeenCalled();
  });
});
