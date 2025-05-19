import { render, fireEvent } from "@testing-library/react-native";
import FormInput from "./FormInput";

describe("FormInput component", () => {
  it("renders placeholder", () => {
    const { getByPlaceholderText } = render(<FormInput placeholder="Email" />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
  });

  it("renders value correctly", () => {
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Email" value="test@email.com" />
    );
    const input = getByPlaceholderText("Email");
    expect(input.props.value).toBe("test@email.com");
  });

  it("calls onChangeText when input changes", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Username" onChangeText={mockFn} />
    );

    fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
    expect(mockFn).toHaveBeenCalledWith("testuser");
  });

  it("sets secureTextEntry correctly", () => {
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Password" secureTextEntry />
    );

    const input = getByPlaceholderText("Password");
    expect(input.props.secureTextEntry).toBe(true);
  });
});
