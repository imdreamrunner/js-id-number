import { IDValidators } from "./IDValidators";

export default IDValidators;

// To support both require and ES6 import default.
for (let attr in IDValidators) {
    exports[attr] = (<any>IDValidators)[attr];
}
