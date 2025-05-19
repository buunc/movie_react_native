jest.mock("expo-router");

import { render, fireEvent } from "@testing-library/react-native";
import CastCard from "./CastCard";

describe("CastCard component", () => {
  const mockCast = {
    id: 123,
    name: "Robert Downey Jr.",
    profile_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    character: "Iron Man",
  };

  it("CastCard text should be render correctly", () => {
    const { getByText, getByTestId } = render(<CastCard {...mockCast} />);
    expect(getByText("Robert Downey Jr.")).toBeTruthy();
    expect(getByText("Iron Man")).toBeTruthy();
    expect(getByTestId("cast-image")).toBeTruthy();
  });

  // it("navigates when pressed", () => {
  //   const { getByRole } = render(<CastCard {...mockCast} />);
  //   expect(getByRole("link")).toHaveProperty('href', '/person/123')
  // })
});
