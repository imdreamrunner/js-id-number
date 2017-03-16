/// <reference path="../types.d.ts" />
import { InternalValidator, InternalValidateResult } from "../types";
export default class TaiwanIDValidator implements InternalValidator {
    static getTWIDFirstCode(c: string): number;
    validate(id: string): InternalValidateResult;
}
