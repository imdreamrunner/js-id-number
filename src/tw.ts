///<reference path='types.ts'/>

namespace IDValidator.tw {

    function getTWIDFirstCode(c: string) {
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

    export function validateTWID(ic: string): ValidateResult {
        if (!ic || ic.length !== 10) {
            return {
                result: false,
                reason: 'error_length'
            };
        }

        if (!/^[A-Z]\d{9}$/i.test(ic)) {
            return {
                result: false,
                reason: 'error_format'
            };
        }

        const start = ic.charAt(0);
        const mid = ic.substring(1, 9);
        const end = ic.charAt(9);
        const iStart = getTWIDFirstCode(start);

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
                result: true
            };
        } else {
            return {
                result: false,
                reason: 'error_checksum'
            };
        }

    }
}