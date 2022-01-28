import { removeDuplicates } from "../src/tag-set";

describe("tag-set", () => {
  test("should handle missing input", () => {
    expect(removeDuplicates(null)).toEqual([]);
  });

  test("should handle empty input", () => {
    expect(removeDuplicates([])).toEqual([]);
  });

  // other cases are handled in E2E tests
});