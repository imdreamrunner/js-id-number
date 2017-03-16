///<reference path='../dist/amd/IDValidators'/>

import * as assert from 'assert';
import IDValidators from '../dist/commonjs';

describe('Taiwan (TW) ID 身份證字號', () => {
    const validator = IDValidators.getValidator('TW', 'ID');

    it('should return a validator.', () => {
        assert.equal(typeof validator, 'function');
    });

    it('should report those number as correct.', () => {
        const cases = [
            'A116108714',
            'F168272824',
            'R174568625',
            'U256587234',
            'O223819290',
            'L298812387'
        ];
        cases.forEach((ic) => {
            assert.equal(validator(ic).success, true);
            assert.equal(validator(ic).reason, null);
        })
    });

    it('should report those number as error_length.', () => {
        const cases = [
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
            '0216108714',
            'A21610871A',
            'A21610871/',
            'A21610871 ',
            ' 216108713',
        ];
        cases.forEach((ic) => {
            assert.equal(validator(ic).success, false);
            assert.equal(validator(ic).reason, 'error_format');
        })
    });

    it('should report those number as error_checksum.', () => {
        const cases = [
            'A216108714',
            'F165272824',
            'R174568624',
            'U256584234',
            'O223619280',
            'L298812383'
        ];
        cases.forEach((ic) => {
            assert.equal(validator(ic).success, false);
            assert.equal(validator(ic).reason, 'error_checksum');
        })
    });
});