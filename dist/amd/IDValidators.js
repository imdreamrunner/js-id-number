///<reference path='types.ts'/>
var IDValidators;
(function (IDValidators) {
    var sg;
    (function (sg) {
        function validateSGIC(ic) {
            return {
                result: true
            };
        }
        sg.validateSGIC = validateSGIC;
    })(sg = IDValidators.sg || (IDValidators.sg = {}));
})(IDValidators || (IDValidators = {}));
///<reference path='types'/>
///<reference path='sg'/>
define("IDValidators", ["require", "exports"], function (require, exports) {
    "use strict";
    var validateSGIC = IDValidators.sg.validateSGIC;
    function getValidator(country, document) {
        return validateSGIC;
    }
    exports.getValidator = getValidator;
});
