///<reference path='types.ts'/>

namespace IDValidator.sg {
    function validateNRIC(str: string) {
        // Modified from https://gist.github.com/eddiemoore/7131781
        // Originally base on Based on http://www.samliew.com/icval/

        if (str.length != 9)
            return 'error_length';

        str = str.toUpperCase();

        const icChar:string[] = [];
        const icNumber:number[] = [];
        for (let i = 0; i < 9; i++) {
            icChar[i] = str.charAt(i);
            icNumber[i] = parseInt(icChar[i], 10);
        }

        icNumber[1] *= 2;
        icNumber[2] *= 7;
        icNumber[3] *= 6;
        icNumber[4] *= 5;
        icNumber[5] *= 4;
        icNumber[6] *= 3;
        icNumber[7] *= 2;

        let weight:number = 0;
        for (let i = 1; i < 8; i++) {
            weight += icNumber[i];
        }

        var offset = (icChar[0] == 'T' || icChar[0] == 'G') ? 4 : 0;
        var temp = (offset + weight) % 11;

        var st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        var fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

        var theAlpha:string;
        if (icChar[0] == 'S' || icChar[0] == 'T') {
            theAlpha = st[temp];
        }
        else if (icChar[0] == 'F' || icChar[0] == 'G') {
            theAlpha = fg[temp];
        }

        if (icChar[8] !== theAlpha) {
            return 'error_checksum';
        }
    }

    export function validateSGIC(ic: string): ValidateResult {
        const error = validateNRIC(ic);
        return {
            result: !error,
            reason: error
        }
    }
}