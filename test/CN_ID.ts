///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';
import IDValidators from '../dist/commonjs';

describe('China ID Number 居民身份证号码', () => {
    const validator = IDValidators.getValidator('CN', 'ID');

    it('should return a validator.', () => {
        assert.equal(typeof validator, 'function');
    });

    [
        '140311199901015072',
        '22011219930407001X',
        '110108196010170230',
        '110101198801017149'
    ].forEach((ic) => {
        it(`should report ${ic} as correct.`, () => {
            assert.equal(validator(ic).success, true, ic + " " + JSON.stringify(validator(ic)));
            assert.equal(validator(ic).reason, null, ic);
        });
    });

    [
        'S0980D',
        'S0980343534D',
        '4r32',
        'i am fantastic',
        '999999199304070016'
    ].forEach((ic) => {
        it(`should report ${ic} as error_format.`, () => {
            assert.equal(validator(ic).success, false, ic + " " + JSON.stringify(validator(ic)));
            assert.equal(validator(ic).reason, 'error_format', ic + " " + JSON.stringify(validator(ic)));
        });
    });

    [
        null,
        false,
        true,
        10,
    ].forEach((icOriginal) => {
        it(`should report ${JSON.stringify(icOriginal)} as error_input_variable.`, () => {
            const ic : string = <string><any>icOriginal;
            assert.equal(validator(ic).success, false, ic + " " + JSON.stringify(validator(ic)));
            assert.equal(validator(ic).reason, 'error_input_variable', ic + " " + JSON.stringify(validator(ic)));
        });
    });

    [
        '110101198801017148',
        '11010819601017023X',
        '140311199901015073'
    ].forEach((ic) => {
        it(`should report ${ic} as error_checksum.`, () => {
            assert.equal(validator(ic).success, false);
            assert.equal(validator(ic).reason, 'error_checksum');
        });
    });
});