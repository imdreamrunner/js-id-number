///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';
import IDValidators from '../dist/commonjs';

describe('IDValidators', () => {
    beforeEach(function () {
    });

    describe('#getValidator', () => {
        it('should return a function if import with require.', () => {
            const IDValidatorsLocal = require('../dist/commonjs');
            const validator = IDValidatorsLocal.getValidator('SG', 'NRIC');
            assert.equal(typeof validator, 'function');
        });

        it('should return a function if import with ES 6.', () => {
            const validator = IDValidators.getValidator('SG', 'NRIC');
            assert.equal(typeof validator, 'function');
        });
    });
});