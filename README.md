# gpc-remove-duplicates

![Downloads](https://img.shields.io/npm/dw/gpc-remove-duplicates?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gpc-remove-duplicates?label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-remove-duplicates/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gpc-remove-duplicates/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-remove-duplicates/Docs/master?label=docs&style=flat-square)

This repository is a remove-duplicates to create precompilers for GherKing.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const {remove-duplicates} = require('gpc-remove-duplicates');

let ast = compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new remove-duplicates({
        // config
    })
);
compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import {remove-duplicates} from "gpc-remove-duplicates";

let ast = load("./features/src/login.feature");
ast = process(
    ast,
    new remove-duplicates({
        // config
    })
);
save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-remove-duplicates/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging.