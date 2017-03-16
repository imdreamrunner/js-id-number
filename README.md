JavaScript ID Number Validator
==============================

## Introduction

This is a collection of validators of identity document number
for JavaScript applications.

[Demo](http://id-number-validator.dreamrunner.space/)

## Usage

Step 1, install.

You can install IDValidators by

* directly import in browser

  ```html
  <script src="dist/bin/IDValidators.js"></script>
  <!-- Please edit the URL above. -->
  ```
  
  [Download latest build.](https://raw.githubusercontent.com/imdreamrunner/js-id-number-validator/master/dist/bin/IDValidators.js)
  
* using in node.js or webpack

  The library is available at NPM with name [`id-number-validator`](https://www.npmjs.com/package/id-number-validator).
  
  You can import it via require.
  
  ```javascript
  const IDValidators = require('id-number-validator');
  ```
  
  Or in ES6 style.
  
  
  ```javascript
  import IDValidators from 'id-number-validator';
  ```
  
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
    'success': true or false,
    'reason': string if the result is false
}
```

### Available Validators

| Country | Document |
|:-------:|:--------:|
| SG (Singapore) | NRIC |
| TW (Taiwan) | ID (身份證字號) |
| CN (China) | ID (居民身份证号码) |


## Development

To build: `npm run build`

To test: `npm test`

### Add a new validator

Step 1: Write the validator in TypeScript in the directory `src/providers/<name>.ts`. 
The validator shall be a function returning a `InternalValidateResult`.

Step 2: Register the validator in `src/IDValidators.ts`

Step 3: Write test cases at `test/<name.ts>`.

Step 4: Send a pull request to this repository.

Thank you for the contributions.

## Bonus

We have a very good [wiki](https://github.com/imdreamrunner/js-id-number-validator/wiki)
that explain the algorithm of the ID number checksum used by different 
identity documents.

