import { IDNumber } from "./IDNumber";

export default IDNumber;

// To support both require and ES6 import default.
for (let attr in IDNumber) {
    exports[attr] = (<any>IDNumber)[attr];
}
