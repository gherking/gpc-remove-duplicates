import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import RemoveDuplicates = require("../src");
import { RemoveDuplicatesOptions } from "../src/types";

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
    const ast: Document[] = pruneID(await load(`./tests/data/${folder}/${file}`)) as Document[];
    delete ast[0].uri;
    return ast[0];
}

describe("remove-duplicates", () => {
    function test_case(file: string, config?: RemoveDuplicatesOptions) {
        return async () => {
            const base = await loadTestFeatureFile("input", file);
            const expected = await loadTestFeatureFile("expected", file);
            const actual = pruneID(process(base, new RemoveDuplicates(config))) as Document[];

            expect(actual).toHaveLength(1);
            expect(actual[0]).toEqual(expected);
        };
    }

    test("should work with default options", test_case("defaults.feature"));

    test("should keep all intact if disabled", test_case("keep-intact.feature", {
        processRows: false,
        processTags: false,
    }));

    test("should work with parametrized tags", test_case("parameter-tags.feature"));

    test("should work without rules", test_case("without-rule.feature", {
        processRows: true,
        processTags: true,
    }));

    test("should work with rules", test_case("with-rule.feature", {
        processRows: true,
        processTags: true,
    }));

    test("should work with multiple rules", test_case("multiple-rules.feature", {
        processRows: true,
        processTags: true,
    }));
});