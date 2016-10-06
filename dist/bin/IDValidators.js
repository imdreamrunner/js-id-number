;(function(global) {
var IDValidators = {};
IDValidators = function (exports) {
  function getValidator(country, document) {
    console.log('get validator.');
  }
  exports.getValidator = getValidator;
  return exports;
}(IDValidators);
global.IDValidators=IDValidators;}(window));