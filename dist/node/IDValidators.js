// IDValidators
///<reference path='types.ts'/>
var IDValidators = {};
var IDValidators;
(function (IDValidators) {
  var sg;
  (function (sg) {
    function validateSGIC(ic) {
      return { result: true };
    }
    sg.validateSGIC = validateSGIC;
  }(sg = IDValidators.sg || (IDValidators.sg = {})));
}(IDValidators || (IDValidators = {})));
IDValidators = function (exports) {
  var validateSGIC = IDValidators.sg.validateSGIC;
  function getValidator(country, document) {
    return validateSGIC;
  }
  exports.getValidator = getValidator;
  return exports;
}(IDValidators);
module.exports=IDValidators;