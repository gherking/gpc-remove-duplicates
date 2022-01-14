# gpc-remove-duplicates

![Downloads](https://img.shields.io/npm/dw/gpc-remove-duplicates?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/gpc-remove-duplicates?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-remove-duplicates/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/workflow/status/gherking/gpc-remove-duplicates/CI/master?label=ci&style=flat-square) ![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-remove-duplicates/Docs/master?label=docs&style=flat-square)

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const RemoveDuplicates = require('gpc-remove-duplicates');

let ast = await compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new RemoveDuplicates({
        // config
    })
);
await compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import RemoveDuplicates from "gpc-remove-duplicates";

let ast = await load("./features/src/login.feature");
ast = process(
    ast,
    new RemoveDuplicates({
        // config
    })
);
await save('./featuresdist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

The RemoveDuplicates precompiler is responsible for having only a reasonable amount of tags and/or rows in each feature file.

It can proceed with the following actions:
1. Removes tags from Rule/Scenario/ScenarioOutline/Examples which exists on parent (Feature/Rule/ScenarioOutline) too.
1. Removes duplicate tags from Feature/Rule/Scenario/ScearioOutline/Examples.
1. Removes duplicate rows from Examples and step DataTables.

## Configuration

RemoveDuplicateRows accepts the following configuration:

| Option | Type | Description | Default |
|:------:|:----:|:------------|:--------|
| `processTags` | `boolean` | It indicates whether the 1st and 2nd options should be applied. | `true` |
| `processRows` | `boolean` | It indicates whether the 3rd option should be applied. | `false` |

## Other

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:remove-duplicates` :

```shell
DEBUG=gpc:remove-duplicates* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-remove-duplicates/).
