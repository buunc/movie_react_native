import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "./SearchBar";

describe("SearchBar component", () => {
  it("renders placeholder", () => {
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" />
    );
    expect(getByPlaceholderText("Search here")).toBeTruthy();
  });

  it("renders value correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" value="starwar" />
    );
    const input = getByPlaceholderText("Search here");
    expect(input.props.value).toBe("starwar");
  });

  it("calls onChangeText when input changes", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" onChangeText={mockFn} />
    );

    fireEvent.changeText(getByPlaceholderText("Search here"), "iron man");
    expect(mockFn).toHaveBeenCalledWith("iron man");
  });

  it("calls onPress prop when input press in", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" onPress={mockFn} />
    );

    fireEvent(getByPlaceholderText("Search here"), 'pressIn');
    expect(mockFn).toHaveBeenCalled();
  });
});
