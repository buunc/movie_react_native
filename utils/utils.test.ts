import { formatDate, convertBithday, convertPersonGender } from "./utils";

describe("formatDate", () => {
  it("formats date in format dd/MM/YYYY correctly if input is ISO string", () => {
    expect(formatDate("2011-10-05T14:48:00.000Z")).toBe("05/10/2011");
  });
  it("formats date in format dd/MM/YYYY correctly if input is datestring", () => {
    expect(formatDate("Wed Oct 05 2011")).toBe("05/10/2011");
  });
  it("formats date in format dd/MM/YYYY correctly if input is datestring", () => {
    expect(formatDate("10/05/2011")).toBe("05/10/2011");
  });
  it("return N/A if not in date format", () => {
    expect(formatDate("")).toBe("N/A");
  });
  it("return N/A if invalid date", () => {
    expect(formatDate("2011-13-31T14:48:00.000Z")).toBe("N/A");
  });
});

describe("convertBithday", () => {
  it("formats birthday in format dd/MM/YYYY correctly if input is in YYYY-MM-dd format", () => {
    expect(convertBithday("2011-10-05")).toBe("05/10/2011");
  });
  it("return N/A if input is not in YYYY-MM-dd format", () => {
    expect(formatDate("")).toBe("N/A");
  });
  it("return N/A if input is not in YYYY-MM-dd format", () => {
    expect(formatDate("2011/13/31")).toBe("N/A");
  });
});

describe("convertBithday", () => {
  it("formats birthday in format dd/MM/YYYY correctly if input is in YYYY-MM-dd format", () => {
    expect(convertBithday("2011-10-05")).toBe("05/10/2011");
  });
  it("return N/A if input is not in YYYY-MM-dd format", () => {
    expect(formatDate("")).toBe("N/A");
  });
  it("return N/A if input is not in YYYY-MM-dd format", () => {
    expect(formatDate("2011/13/31")).toBe("N/A");
  });
});

describe("convertPersonGender", () => {
  it("Convert gender code 1 into string Female", () => {
    expect(convertPersonGender(1)).toBe("Female");
  });
  it("Convert gender code 2 into string Male", () => {
    expect(convertPersonGender(2)).toBe("Male");
  });
  it("Convert other gender codes into string Unknown", () => {
    expect(convertPersonGender(3)).toBe("Unknown");
  });
});
