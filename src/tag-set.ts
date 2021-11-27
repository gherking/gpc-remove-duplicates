import { Tag } from "gherkin-ast";
import ObjectSetType = require("object-set-type");

export function removeDuplicates(tags: Tag[], ...tagsToIgnore: Tag[]): Tag[] {
    if (!tags || !tags.length) {
        return [];
    }
    const uniqueTags = Array.from(new TagSet(tags));
    if (!tagsToIgnore.length) {
        return uniqueTags;
    }
    const parentUniqueTags = new TagSet(tagsToIgnore);
    return uniqueTags.filter((tag: Tag): boolean => !parentUniqueTags.has(tag));
}

export class TagSet extends ObjectSetType<Tag> {
    public equals(a: Tag, b: Tag): boolean {
        return a.name === b.name && a.value === b.value;
    }
}