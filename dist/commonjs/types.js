"use strict";
(function (ErrorCode) {
    ErrorCode[ErrorCode["error_input_variable"] = 0] = "error_input_variable";
    ErrorCode[ErrorCode["error_checksum"] = 1] = "error_checksum";
    ErrorCode[ErrorCode["error_length"] = 2] = "error_length";
    ErrorCode[ErrorCode["error_format"] = 3] = "error_format";
})(exports.ErrorCode || (exports.ErrorCode = {}));
var ErrorCode = exports.ErrorCode;
