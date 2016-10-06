///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';

const IDValidators = require('../dist/node/IDValidators');

describe('IDValidators', () => {
    beforeEach(function () {
    });

    describe('#getValidator', () => {
        it('should return a function.', () => {
            const validator = IDValidators.getValidator('SG', 'IC');
            assert.equal(typeof validator, 'function');
        });
    });
});