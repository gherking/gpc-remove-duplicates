import { PreCompiler } from "gherking";
import { Tag, Feature, Scenario, ScenarioOutline, Rule, Examples } from "gherkin-ast";
import { RemoveDuplicatesOptions } from "./types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:remove-duplicates");

const DEFAULT_CONFIG: RemoveDuplicatesOptions = {
    processRows: false,
    processTags: true,
    verbose: true,
};

type HasTag = Scenario | Feature | ScenarioOutline | Examples;
type Parent = Rule | Feature;
type Logger = (...message: string[]) => void;

const tagEquals = (t1: Tag, t2: Tag): boolean => {
    return t1.name === t2.name && t1.value === t2.value;
};

const hasTag = (element: HasTag, tag: Tag): boolean => {
    if (!Array.isArray(element.tags) || !element.tags.length) {
        return false;
    }
    return element.tags.some(t => tagEquals(t, tag));
}

const getLogger = (name: string, enabled: boolean, verbose: boolean): Logger => {
    if (!verbose) {
        return () => null;
    }
    if (enabled) {
        return console.log.bind(null, `[${name}]`);
    }
    return console.warn.bind(null, `[${name}]`);
};

class RemoveDuplicates implements PreCompiler {
    private options: RemoveDuplicatesOptions;
    private tagLogger: Logger;
    private rowLogger: Logger;

    constructor(options?: Partial<RemoveDuplicatesOptions>) {
        this.options = {
            ...DEFAULT_CONFIG,
            ...(options || {}),
        };

        this.tagLogger = getLogger('tag', this.options.processTags, this.options.verbose);
        this.rowLogger = getLogger('row', this.options.processRows, this.options.verbose);
    }

    private filterTags(element: HasTag, parent: Parent): void {
        if (Array.isArray(element.tags) && element.tags.length) {
            const ownTags: Tag[] = element.tags.filter((tag: Tag) => {
                if (hasTag(parent, tag)) {
                    this.tagLogger(`The ${tag} presents on the feature too on "${element.keyword} ${element.name}" in "${parent.keyword} ${parent.name}"`);
                }
            })
        }
    }
}

// IMPORTANT: the precompiler class MUST be the export!
export = RemoveDuplicates;