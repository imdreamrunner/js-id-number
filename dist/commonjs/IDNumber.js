"use strict";
var types_1 = require("./types");
var SG_NRIC_1 = require("./providers/SG_NRIC");
var TW_ID_1 = require("./providers/TW_ID");
var CN_ID_1 = require("./providers/CN_ID");
var providerRegistry = {
    'SG': {
        'NRIC': SG_NRIC_1.default
    },
    'TW': {
        'ID': TW_ID_1.default
    },
    'CN': {
        'ID': CN_ID_1.default
    }
};
var IDNumber = (function () {
    function IDNumber() {
    }
    IDNumber.getValidator = function (country, document) {
        if (providerRegistry.hasOwnProperty(country)) {
            var countryValidators = providerRegistry[country];
            if (countryValidators.hasOwnProperty(document)) {
                var validator_1 = new countryValidators[document]();
                return function (id) {
                    var result = validator_1.validate(id);
                    var output = { success: result.success };
                    if (result.hasOwnProperty("reason"))
                        output.reason = types_1.ErrorCode[result.reason];
                    if (result.hasOwnProperty("extra"))
                        output.extra = result.extra;
                    return output;
                };
            }
        }
    };
    return IDNumber;
}());
exports.IDNumber = IDNumber;
