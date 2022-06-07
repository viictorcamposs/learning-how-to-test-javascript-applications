const { sum } = require("./index");

it("should sum 2 and 2 and the result must be 4", () => {
  expect(sum(2, 2)).toBe(4);
});

it("should sum 2 and 2 even if one of the prop is a string and the result must be 4", () => {
  expect(sum("2", "2")).toBe(4);
});

it("should throw an error if whats is provided to the method cannot be summed", () => {
  expect(() => sum("", "2")).toThrowError();

  expect(() => sum([2, 2])).toThrowError();

  expect(() => sum({})).toThrowError();

  expect(() => sum()).toThrowError();
});
