`id-number`: JavaScript ID Number Toolkit
=========================================

[![JavaScript ID Number Toolkit](misc/banner.png)][demo-link]

JavaScript ID Number Toolkit is a collection of validators of identity 
document number for JavaScript applications.

[Visit the DEMO website!][demo-link]

[![Build Status](https://img.shields.io/travis/imdreamrunner/js-id-number/master.svg?style=flat-square)][travis-link]
[![NPM Version](https://img.shields.io/npm/v/id-number.svg?style=flat-square)][npm-link]
[![NPM Downloads](https://img.shields.io/npm/dt/id-number.svg?style=flat-square)][npm-link]

## Usage

### Installation

You can install IDNumber by

* directly import in browser

  ```html
  <script src="IDNumber.js"></script>
  <!-- Please edit the URL above. -->
  ```
  
  [Download latest build.][release-link]
  
  A CDN for this file is available at:
  
  ```
  https://unpkg.com/id-number/dist/browser/IDNumber.js
  ```
  
* using in node.js or webpack

  The library is available at NPM with name [`id-number`][npm-link].
  
  You can import it via require.
  
  ```javascript
  const IDNumber = require('id-number');
  ```
  
  Or in ES6 style.
  
  
  ```javascript
  import IDNumber from 'id-number';
  ```
  
### ID Number Validation

```javascript
const validator = IDNumber.getValidator('SG', 'NRIC');
const result = validator('S0980292D');
```

And the result is in format:

```
{
    'success': true or false,
    'reason': string if the result is false
}
```
  
### ID Number Generation

```javascript
const generator = IDNumber.getValidator('CN', 'ID');
const result = generator();
```

And the result is in format:

```
{
    'value': 466311201110053638,
    'extra': {"province":"海南","birthday":"2011-10-05","gender":"Male"}
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

### Add support for new identity documentations

Step 1: Write the validator / generator in TypeScript in the directory `src/providers/<name>.ts`. 
The validator shall be a function returning a `InternalValidateResult`.

Step 2: Register the validator / generator in `src/IDNumber.ts`

Step 3: Write test cases at `src/<name>.spec.ts`.

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

[npm-link]: https://www.npmjs.com/package/id-number
[demo-link]: http://id-number.dreamrunner.space
[travis-link]: https://travis-ci.org/imdreamrunner/js-id-number
[release-link]: https://github.com/imdreamrunner/js-id-number/releases
