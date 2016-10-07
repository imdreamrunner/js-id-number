///<reference path='types.ts'/>
var IDValidator;
(function (IDValidator) {
    var sg;
    (function (sg) {
        function validateNRIC(str) {
            // Modified from https://gist.github.com/eddiemoore/7131781
            // Originally base on Based on http://www.samliew.com/icval/
            if (!str || str.length != 9)
                return 'error_length';
            if (!/^[SFGT]\d{7}[A-Z]$/i.test(str))
                return 'error_format';
            str = str.toUpperCase();
            var icChar = [];
            var icNumber = [];
            for (var i = 0; i < 9; i++) {
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
            var weight = 0;
            for (var i = 1; i < 8; i++) {
                weight += icNumber[i];
            }
            var offset = (icChar[0] == 'T' || icChar[0] == 'G') ? 4 : 0;
            var temp = (offset + weight) % 11;
            var st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
            var fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
            var theAlpha;
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
        function validateSGIC(ic) {
            var error = validateNRIC(ic);
            return {
                result: !error,
                reason: error
            };
        }
        sg.validateSGIC = validateSGIC;
    })(sg = IDValidator.sg || (IDValidator.sg = {}));
})(IDValidator || (IDValidator = {}));
///<reference path='types.ts'/>
var IDValidator;
(function (IDValidator) {
    var tw;
    (function (tw) {
        function getTWIDFirstCode(c) {
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
        function validateTWID(ic) {
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
            var start = ic.charAt(0);
            var mid = ic.substring(1, 9);
            var end = ic.charAt(9);
            var iStart = getTWIDFirstCode(start);
            var sum = Math.floor(iStart / 10) + (iStart % 10) * 9;
            var iflag = 8;
            for (var i = 0; i < mid.length; i++) {
                var c = mid.charAt(i);
                sum += parseInt(c, 10) * iflag;
                iflag--;
            }
            var checksumCorrect = (sum % 10 == 0 ? 0 : (10 - sum % 10)) == parseInt(end, 10);
            if (checksumCorrect) {
                return {
                    result: true
                };
            }
            else {
                return {
                    result: false,
                    reason: 'error_checksum'
                };
            }
        }
        tw.validateTWID = validateTWID;
    })(tw = IDValidator.tw || (IDValidator.tw = {}));
})(IDValidator || (IDValidator = {}));
///<reference path='types'/>
///<reference path='sg'/>
///<reference path='tw'/>
define("IDValidators", ["require", "exports"], function (require, exports) {
    "use strict";
    var validateSGIC = IDValidator.sg.validateSGIC;
    var validateTWID = IDValidator.tw.validateTWID;
    function getValidator(country, document) {
        if (country == 'SG') {
            return validateSGIC;
        }
        else if (country == 'TW') {
            return validateTWID;
        }
    }
    exports.getValidator = getValidator;
});
