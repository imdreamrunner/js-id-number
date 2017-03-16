///<reference path='../types.ts'/>

import {InternalValidator, InternalValidateResult, ErrorCode} from "../types";

export default class TaiwanIDValidator implements InternalValidator {
    static getTWIDFirstCode(c: string) {
        if (c == 'I') {
            return 34;
        }
        if (c == 'O') {
            return 35;
        }
        if (c <= 'H') {
            return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        }
        if (c <= 'N') {
            return c.charCodeAt(0) - 'J'.charCodeAt(0) + 18;
        }
        if (c <= 'Z') {
            return c.charCodeAt(0) - 'P'.charCodeAt(0) + 23;
        }
    }

    validate(id:string):InternalValidateResult {
        if (!id || id.length !== 10) {
            return {
                success: false,
                reason: ErrorCode.error_length
            };
        }

        if (!/^[A-Z]\d{9}$/i.test(id)) {
            return {
                success: false,
                reason: ErrorCode.error_format
            };
        }

        const start = id.charAt(0);
        const mid = id.substring(1, 9);
        const end = id.charAt(9);
        const iStart = TaiwanIDValidator.getTWIDFirstCode(start);

        let sum = Math.floor(iStart / 10) + (iStart % 10) * 9;
        let iflag = 8;
        for (let i = 0; i < mid.length; i++) {
            const c = mid.charAt(i);
            sum += parseInt(c, 10) * iflag;
            iflag --;
        }

        const checksumCorrect = (sum % 10 == 0 ? 0 : (10 - sum % 10)) == parseInt(end, 10);
        if (checksumCorrect) {
            return {
                success: true
            };
        } else {
            return {
                success: false,
                reason: ErrorCode.error_checksum
            };
        }
    }

}