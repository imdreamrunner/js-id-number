///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';

const IDValidators = require('../dist/commonjs/IDValidators');

describe('IDValidators', () => {
    beforeEach(function () {
    });

    describe('#getValidator', () => {
        it('should return a function.', () => {
            console.log('here');
            console.log(IDValidators);
            const validator = IDValidators.getValidator('SG', 'IC');
            // console.log(validator);
            // assert.equal(typeof validator, 'function');
        });
    });
});