`id-number`: JavaScript ID Number Toolkit
=========================================

![JavaScript ID Number Toolkit](misc/banner.png)

JavaScript ID Number Toolkit is a collection of validators of identity 
document number for JavaScript applications.

[DEMO](http://id-number.dreamrunner.space)

[![Build Status](https://travis-ci.org/imdreamrunner/js-id-number.svg?branch=master)](https://travis-ci.org/imdreamrunner/js-id-number)

## Usage

Step 1, install.

You can install IDNumber by

* directly import in browser

  ```html
  <script src="IDNumber.js"></script>
  <!-- Please edit the URL above. -->
  ```
  
  [Download latest build.](https://github.com/imdreamrunner/js-id-number/releases)
  
  A CDN for this file is available at:
  
  ```
  https://unpkg.com/id-number/dist/bin/IDValidators.js
  ```
  
* using in node.js or webpack

  The library is available at NPM with name [`id-number`](https://www.npmjs.com/package/id-number).
  
  You can import it via require.
  
  ```javascript
  const IDNumber = require('id-number');
  ```
  
  Or in ES6 style.
  
  
  ```javascript
  import IDNumber from 'id-number';
  ```
  
Step 2, get a validator.

```javascript
const validator = IDNumber.getValidator('SG', 'NRIC');
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

Step 2: Register the validator in `src/IDNumber.ts`

Step 3: Write test cases at `test/<name.ts>`.

Step 4: Send a pull request to this repository.

Thank you for the contributions.

## Demo Website

The source code for demo website (id-number.dreamrunner.space) locates
at the `demo` folder.

To deploy, go into `demo` folder and type `yarn deploy` if you have
permission.

## Bonus

We have a very good [wiki](https://github.com/imdreamrunner/js-id-number/wiki)
that explain the algorithm of the ID number checksum used by different 
identity documents.
