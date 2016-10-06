///<reference path='../dist/amd/IDValidators'/>
"use strict";
var IDValidators = require('../dist/commonjs/IDValidators');
describe('IDValidators', function () {
    beforeEach(function () {
    });
    describe('#getValidator', function () {
        it('should return a function.', function () {
            console.log('here');
            console.log(IDValidators);
            var validator = IDValidators.getValidator('SG', 'IC');
            // console.log(validator);
            // assert.equal(typeof validator, 'function');
        });
    });
});
