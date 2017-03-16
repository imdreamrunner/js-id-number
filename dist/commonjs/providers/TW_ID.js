///<reference path='../types.ts'/>
"use strict";
var types_1 = require("../types");
var TaiwanIDValidator = (function () {
    function TaiwanIDValidator() {
    }
    TaiwanIDValidator.getTWIDFirstCode = function (c) {
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
    };
    TaiwanIDValidator.prototype.validate = function (id) {
        if (!id || id.length !== 10) {
            return {
                success: false,
                reason: types_1.ErrorCode.error_length
            };
        }
        if (!/^[A-Z]\d{9}$/i.test(id)) {
            return {
                success: false,
                reason: types_1.ErrorCode.error_format
            };
        }
        var start = id.charAt(0);
        var mid = id.substring(1, 9);
        var end = id.charAt(9);
        var iStart = TaiwanIDValidator.getTWIDFirstCode(start);
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
                success: true
            };
        }
        else {
            return {
                success: false,
                reason: types_1.ErrorCode.error_checksum
            };
        }
    };
    return TaiwanIDValidator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TaiwanIDValidator;
