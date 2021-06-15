import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
  it("should display message containing string weak if passed value is 5", () => {
    // Arrange  - Create the object of StrengthPipe
    let pipe = new StrengthPipe();

    // Act - invoke the transform function by passing value
    // transform() function executed
    let result = pipe.transform(5);

    // Assertion
    expect(result.toUpperCase()).toContain("WEAK");
  });

  it("should display message containing string strong or STRONG  if passed value is 14", () => {
    // Arrange
    let pipe = new StrengthPipe();

    // Act
    let result = pipe.transform(14);

    // Assertion
    expect(result).toEqual("14 (strong)");
  });
});
