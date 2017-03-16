///<reference path='../types.ts'/>
"use strict";
var types_1 = require("../types");
var SampleValidator = (function () {
    function SampleValidator() {
    }
    SampleValidator.prototype.validate = function (id) {
        return {
            success: false,
            reason: types_1.ErrorCode.error_checksum
        };
    };
    return SampleValidator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SampleValidator;
