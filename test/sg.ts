///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';

const IDValidators = require('../dist/node/IDValidators');

describe('Singapore (SG)', () => {
    const validator = IDValidators.getValidator('SG', 'NRIC');

    describe('NRIC / FIN', () => {
        it('should return a validator.', () => {
            assert.equal(typeof validator, 'function');
        });

        it('should report those number as correct.', () => {
            const correctICs = [
                'S0980292D',
                'S4155220D',
                'T0393475B',
                'T9787176G',
                'F9069967U',
                'F4700348L',
                'G4861307T',
                'G9173695R'
            ];
            correctICs.forEach((ic) => {
                assert.equal(validator(ic).result, true);
                assert.equal(validator(ic).reason, null);
            })
        });

        it('should report those number as error_length.', () => {
            const correctICs = [
                'S0980D',
                'S0980343534D',
            ];
            correctICs.forEach((ic) => {
                assert.equal(validator(ic).result, false);
                assert.equal(validator(ic).reason, 'error_length');
            })
        });

        it('should report those number as error_length.', () => {
            const correctICs = [
                'S0980292B',
                'S4155220B',
                'T0393475G',
                'T9787176B',
                'F9069967L',
                'F4700348U',
                'G4861307R',
                'G9173695T'
            ];
            correctICs.forEach((ic) => {
                assert.equal(validator(ic).result, false);
                assert.equal(validator(ic).reason, 'error_checksum');
            })
        });
    });
});