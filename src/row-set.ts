import { TableRow } from "gherkin-ast";
import ObjectSetType = require("object-set-type");

export function removeDuplicates(rows: TableRow[]): TableRow[] {
  if (!rows || !rows.length) {
    return [];
  }
  return Array.from(new TableRowSet(rows));
}

export class TableRowSet extends ObjectSetType<TableRow> {
  public equals(a: TableRow, b: TableRow): boolean {
    return !!a && !!b
      && a.cells.length == b.cells.length
      && a.cells.every((c, i) => b.cells[i].value == c.value);
  }
}