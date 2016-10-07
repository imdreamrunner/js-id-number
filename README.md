JavaScript ID Number Validator
==============================

## Introduction

This is a collection of validators of identity document number
for JavaScript applications.

## Usage

Step 1, install.

You can install IDValidators by

* directly import in browser
  <script src="dist/bin/IDValidators.js"></script>
* using in node.js
  const IDValidators = require('../dist/node/IDValidators');
* require as amd module
  const IDValidators = require('../dist/amd/IDValidators');

Step 2, get a validator.

```javascript
const validator = IDValidators.getValidator('SG', 'NRIC');
```

Step 3, validate an input.

```javascript
const result = validator('S0980292D');
```

And the result is in format:

```
{
    'result': true or false,
    'reason': string if the result is false
}
```

### Available Validators

| Country | Document |
|:-------:|:--------:|
| SG (Singapore) | NRIC |


## Development

To build: `npm run build`

To test: `npm test`

