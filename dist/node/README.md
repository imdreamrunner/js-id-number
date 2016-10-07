ID Number Validator for Node
============================

## Introduction

This is a collection of validators of identity document number
for JavaScript applications.

## Usage

Step 1, install.

```
npm i node-id-number-validator
```
  
Step 2, get a validator.

```javascript
const IDValidators = require('node-id-number-validator');
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


