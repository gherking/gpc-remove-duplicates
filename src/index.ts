import { PreCompiler } from "gherking";
import { Tag, Feature, Scenario, ScenarioOutline, Rule, Examples, Document, DataTable, Step } from "gherkin-ast";
import { RemoveDuplicatesOptions } from "./types";
import * as tagSet from "./tag-set";
import * as rowSet from "./row-set";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:remove-duplicates");

const DEFAULT_CONFIG: RemoveDuplicatesOptions = {
    processRows: false,
    processTags: true,
};

class RemoveDuplicates implements PreCompiler {
    private options: RemoveDuplicatesOptions;

    private featureTags: Tag[];
    private ruleTags: { [key: string]: Tag[] };

    constructor(options?: Partial<RemoveDuplicatesOptions>) {
        this.options = {
            ...DEFAULT_CONFIG,
            ...(options || {}),
        };
    }

    public handleElementTags(e: Scenario | ScenarioOutline | Examples | Rule, p?: Feature | Rule, ...tagsToIgnore: Tag[]): void {
        /* istanbul ignore next */
        debug('handleElementTags(e: %s, p: %s, toIgnore: %d)', e?.constructor.name, p?.constructor.name, tagsToIgnore.length);
        if (!this.options.processTags) {
            debug('...tags not processed')
            return;
        }

        debug('...tags: %o', e.tags);
        e.tags = tagSet.removeDuplicates(e.tags, ...this.featureTags);
        debug('...tags after deduplicate with feature tags: %o', e.tags);

        if (!!p && p instanceof Rule && this.ruleTags[p._id]) {
            debug('...rule tags: %o', this.ruleTags[p._id]);
            e.tags = tagSet.removeDuplicates(e.tags, ...this.ruleTags[p._id]);
            debug('...tags after deduplicate with rule tags: %o', e.tags);
        }

        if (tagsToIgnore.length) {
            debug('...ignored tags: %o', tagsToIgnore);
            e.tags = tagSet.removeDuplicates(e.tags, ...tagsToIgnore);
            debug('...tags after deduplicate with ignored tags: %o', e.tags);
        }
    }

    public handleTableRows(e: DataTable | Examples): void {
        /* istanbul ignore next */
        debug('handleTableRows(e: %s)', e?.constructor.name);
        if (!this.options.processRows) {
            debug('...rows not processed')
            return;
        }
        if (e instanceof DataTable) {
            debug('...data table rows: %o', e.rows);
            e.rows = rowSet.removeDuplicates(e.rows);
            debug('...data table rows after deduplicate: %o', e.rows);
        } else if (e instanceof Examples) {
            debug('...example rows: %o', e.body);
            e.body = rowSet.removeDuplicates(e.body);
            debug('...example rows after deduplicate: %o', e.body);
        }
    }

    public onFeature(f: Feature, _1: Document, _2: number): void {
        /* istanbul ignore next */
        debug('onFeature(f: %s)', f?.constructor.name);
        if (!this.options.processTags) {
            debug('...tags not processed')
            return;
        }

        debug('...tags: %o', f.tags);
        f.tags = tagSet.removeDuplicates(f.tags);
        debug('...tags after deduplicate: %o', f.tags);

        this.featureTags = f.tags;
        this.ruleTags = {};
        debug('...{featureTags: %o, ruleTags: %o}', this.featureTags, this.ruleTags);
    }

    public onRule(r: Rule, f: Feature, _2: number): void {
        /* istanbul ignore next */
        debug('onRule(r: %s, f: %s)', r?.constructor.name, f?.constructor.name);
        this.handleElementTags(r, f);
        this.ruleTags[r._id] = r.tags;
        debug('...{ruleTags: %o}', this.ruleTags);
    }

    public onScenario(s: Scenario, p: Feature | Rule, _1: number): void {
        /* istanbul ignore next */
        debug('onScenario(s: %s, p: %s)', s?.constructor.name, p?.constructor.name);
        this.handleElementTags(s, p);
    }

    public onScenarioOutline(so: ScenarioOutline, p: Feature | Rule, _1: number): void {
        /* istanbul ignore next */
        debug('onScenarioOutline(so: %s, p: %s)', so?.constructor.name, p?.constructor.name);
        this.handleElementTags(so, p);

        for (const e of so.examples) {
            /* istanbul ignore next */
            debug('(pseudo)onExamples(e: %s, so: %s)', e?.constructor.name, so?.constructor.name);
            this.handleElementTags(e, p);
            this.handleElementTags(e, null, ...so.tags);
        }
    }

    public onDataTable(t: DataTable, _1: Step): void {
        /* istanbul ignore next */
        debug('onDataTable(t: %s)', t?.constructor.name);
        this.handleTableRows(t);
    }

    public onExamples(e: Examples, _1: ScenarioOutline, _2: number): void {
        /* istanbul ignore next */
        debug('onExamples(e: %s)', e?.constructor.name);
        this.handleTableRows(e);
    }
}

// IMPORTANT: the precompiler class MUST be the export!
export = RemoveDuplicates;