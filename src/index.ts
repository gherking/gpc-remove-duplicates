import { PreCompiler } from "gherking";
import { Tag } from "gherkin-ast";
import { RemoveDuplicatesOptions } from "./types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:remove-duplicates");

const DEFAULT_CONFIG: RemoveDuplicatesOptions = {
    processRows: false,
    processTags: true,
    verbose: true,
};

interface HasTag {
    tags?: Tag[];
}

class RemoveDuplicates implements PreCompiler {
    private options: RemoveDuplicatesOptions;

    constructor(options?: Partial<RemoveDuplicatesOptions>) {
        this.options = {
            ...DEFAULT_CONFIG,
            ...(options || {}),
        };
    }

    private hasTag(element: HasTag, tagName: string): boolean {
        if (!Array.isArray(element.tags) || !element.tags.length) {
            return false;
        }
        return element.tags.some(tag => tag.name === tagName);
    }

    private filterTags(element: HasTag, parent: any):
}

// IMPORTANT: the precompiler class MUST be the export!
export = RemoveDuplicates;