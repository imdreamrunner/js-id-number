import { InternalValidator, InternalValidateResult } from "../types";
export default class ChinaIDValidator implements InternalValidator {
    validate(idNumber: string): InternalValidateResult;
}
