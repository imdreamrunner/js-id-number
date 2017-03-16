"use strict";
var IDValidators_1 = require("./IDValidators");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IDValidators_1.IDValidators;
// To support both require and ES6 import default.
for (var attr in IDValidators_1.IDValidators) {
    exports[attr] = IDValidators_1.IDValidators[attr];
}
