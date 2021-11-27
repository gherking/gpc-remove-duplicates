import { PreCompiler } from "gherking";
import { Tag, Feature, Scenario, ScenarioOutline, Rule, Examples, Document, Element } from "gherkin-ast";
import { RemoveDuplicatesOptions } from "./types";
import { removeDuplicates } from "./tag-set";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:remove-duplicates");

const DEFAULT_CONFIG: RemoveDuplicatesOptions = {
    processRows: false,
    processTags: true,
    verbose: true,
};

type Logger = (...message: string[]) => void;

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

    private featureTags: Tag[];
    private ruleTags: { [key: string]: Tag[] };

    constructor(options?: Partial<RemoveDuplicatesOptions>) {
        this.options = {
            ...DEFAULT_CONFIG,
            ...(options || {}),
        };

        this.tagLogger = getLogger('tag', this.options.processTags, this.options.verbose);
        this.rowLogger = getLogger('row', this.options.processRows, this.options.verbose);
    }

    public onFeature(f: Feature, _1: Document, _2: number): void {
        debug('onFeature(f: %s)', f?.constructor.name);
        if (!this.options.processTags) {
            debug('...tags not processed')
            return;
        }

        debug('...tags: %o', f.tags);
        // 1. remove duplicate tags from the feature tags
        f.tags = removeDuplicates(f.tags || []);
        debug('...tags after deduplicate: %o', f.tags);
        // 2. store the tags of the feature to use for subsequent items
        this.featureTags = f.tags || [];
        // 3. clearing the rule tags
        this.ruleTags = {};
        debug('...{featureTags: %o, ruleTags: %o}', this.featureTags, this.ruleTags);
    }

    public onRule(r: Rule, _1: Feature, _2: number): void {
        if (!this.options.processTags) {
            return;
        }

        // 4. removing duplicate tags from the rule tags (incl. feature tags)
        r.tags = removeDuplicates(r.tags || [], ...this.featureTags);
        this.ruleTags[r._id] = r.tags || [];
    }

    public handleElementTags(e: Scenario | ScenarioOutline | Examples, p: Feature | Rule): void {
        // 5. removing duplicate tags from the scenario tags (incl. feature tags)
        e.tags = removeDuplicates(e.tags || [], ...this.featureTags);
        if (p instanceof Rule) {
            // 6. removing duplicate tags comparing the rule tags
            e.tags = removeDuplicates(e.tags, ...this.ruleTags[p._id]);
        }
    }

    public onScenario(s: Scenario, p: Feature | Rule, _1: number): void {
        if (!this.options.processTags) {
            return;
        }
        this.handleElementTags(s, p);
    }

    public onScenarioOutline(so: ScenarioOutline, p: Feature | Rule, _1: number): void {
        if (!this.options.processTags) {
            return;
        }
        this.handleElementTags(so, p);

        for (const e of so.examples) {
            this.handleElementTags(e, p);
            e.tags = removeDuplicates(e.tags, ...so.tags);
        }
    }
}

// IMPORTANT: the precompiler class MUST be the export!
export = RemoveDuplicates;