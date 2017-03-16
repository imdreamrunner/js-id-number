///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';
import IDValidators from '../dist/commonjs';

describe('Singapore (SG) NRIC / FIN', () => {
    const validator = IDValidators.getValidator('SG', 'NRIC');

    it('should return a validator.', () => {
        assert.equal(typeof validator, 'function');
    });

    it('should report those number as correct.', () => {
        const cases = [
            'S0980292D',
            'S4155220D',
            'T0393475B',
            'T9787176G',
            'F9069967U',
            'F4700348L',
            'G4861307T',
            'G9173695R'
        ];
        cases.forEach((ic) => {
            assert.equal(validator(ic).success, true);
            assert.equal(validator(ic).reason, null);
        })
    });

    it('should report those number as error_length.', () => {
        const cases = [
            'S0980D',
            'S0980343534D',
            '4r32',
            null,
            false,
            true,
            10,
            'i am fantastic'
        ];
        cases.forEach((ic) => {
            assert.equal(validator(<string>ic).success, false);
            assert.equal(validator(<string>ic).reason, 'error_length');
        })
    });


    it('should report those number as error_format.', () => {
        const cases = [
            'A0980292D',
            'G09802924',
        ];
        cases.forEach((ic) => {
            assert.equal(validator(ic).success, false);
            assert.equal(validator(ic).reason, 'error_format');
        })
    });

    it('should report those number as error_checksum.', () => {
        const cases = [
            'S0980292B',
            'S4155220B',
            'T0393475G',
            'T9787176B',
            'F9069967L',
            'F4700348U',
            'G4861307R',
            'G9173695T'
        ];
        cases.forEach((ic) => {
            assert.equal(validator(ic).success, false);
            assert.equal(validator(ic).reason, 'error_checksum');
        })
    });
});