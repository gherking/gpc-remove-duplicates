import { removeDuplicates } from "../src/row-set";

describe("row-set", () => {
  test("should handle missing input", () => {
    expect(removeDuplicates(null)).toEqual([]);
  });

  test("should handle empty input", () => {
    expect(removeDuplicates([])).toEqual([]);
  });

  // other cases are handled in E2E tests
});