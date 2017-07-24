import * as assert from 'assert';
import IDValidators from '../dist/commonjs';

describe('IDNumber', () => {
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


    describe('#getValidator --> response', () => {
        const validator = IDValidators.getValidator('SG', 'NRIC');
        const successResult = validator('S0980292D');
        assert.equal(successResult.success, true);
        assert.equal(successResult.reason, null);
        const errorResult = validator('S0980292X');
        assert.equal(errorResult.success, false);
        assert.equal(errorResult.reason, 'error_checksum');
    })
});