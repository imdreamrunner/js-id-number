import * as assert from "assert";
import ChineseIdTool from "./CN_ID";
import { ErrorCode } from "../types";

describe('China ID Number 居民身份证号码', () => {
    const chineseIdTool = new ChineseIdTool();

    [
        '140311199901015072',
        '22011219930407001X',
        '110108196010170230',
        '110101198801017149'
    ].forEach((ic) => {
        it(`should report ${ic} as correct.`, () => {
            const result = chineseIdTool.validate(ic);
            assert.equal(result.success, true, ic + " " + JSON.stringify(result));
            assert.equal(result.reason, null, ic);
        });
    });

    [
        'S0980D',
        'S0980343534D',
        '4r32',
        'i am fantastic'
    ].forEach((ic) => {
        it(`should report ${ic} as error_length.`, () => {
            const result = chineseIdTool.validate(ic);
            assert.equal(result.success, false, ic + " " + JSON.stringify(result));
            assert.equal(result.reason, ErrorCode.error_length, ic + " " + JSON.stringify(result));
        });
    });

    [
        '999999199304070016'
    ].forEach((ic) => {
        it(`should report ${ic} as error_format.`, () => {
            const result = chineseIdTool.validate(ic);
            assert.equal(result.success, false, ic + " " + JSON.stringify(result));
            assert.equal(result.reason, ErrorCode.error_format, ic + " " + JSON.stringify(result));
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
            const result = chineseIdTool.validate(ic);
            assert.equal(result.success, false, ic + " " + JSON.stringify(result));
            assert.equal(result.reason, ErrorCode.error_input_variable, ic + " " + JSON.stringify(result));
        });
    });

    [
        '110101198801017148',
        '11010819601017023X',
        '140311199901015073'
    ].forEach((ic) => {
        it(`should report ${ic} as error_checksum.`, () => {
            const result = chineseIdTool.validate(ic);
            assert.equal(result.success, false);
            assert.equal(result.reason, ErrorCode.error_checksum);
        });
    });

    for (let i = 0; i < 10; i++) {
        it('should generate a random Chinese ID number', () => {
            const generatedResult = chineseIdTool.generate();
            console.log('Generated Chinese ID Number: ' + generatedResult.value + ' Extra: ' + JSON.stringify(generatedResult.extra));
            assert.equal(typeof generatedResult.value, "string", JSON.stringify(generatedResult));
            const validateResult = chineseIdTool.validate(generatedResult.value);
            assert.equal(validateResult.success, true, JSON.stringify(generatedResult));
        })
    }

});