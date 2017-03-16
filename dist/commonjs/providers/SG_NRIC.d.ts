/// <reference path="../types.d.ts" />
import { InternalValidator, InternalValidateResult, ErrorCode } from "../types";
export default class SingaporeNRICValidator implements InternalValidator {
    static validateNRIC(str: string): ErrorCode;
    validate(id: string): InternalValidateResult;
}
