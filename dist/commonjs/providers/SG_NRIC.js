///<reference path='../types.ts'/>
"use strict";
var types_1 = require("../types");
var SingaporeNRICValidator = (function () {
    function SingaporeNRICValidator() {
    }
    SingaporeNRICValidator.validateNRIC = function (str) {
        // Modified from https://gist.github.com/eddiemoore/7131781
        // Originally base on Based on http://www.samliew.com/icval/
        if (!str || str.length != 9)
            return types_1.ErrorCode.error_length;
        if (!/^[SFGT]\d{7}[A-Z]$/i.test(str))
            return types_1.ErrorCode.error_format;
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
            return types_1.ErrorCode.error_checksum;
        }
    };
    SingaporeNRICValidator.prototype.validate = function (id) {
        var error = SingaporeNRICValidator.validateNRIC(id);
        return {
            success: !error,
            reason: error
        };
    };
    return SingaporeNRICValidator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SingaporeNRICValidator;
