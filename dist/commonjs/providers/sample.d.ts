/// <reference path="../types.d.ts" />
import { InternalValidator, InternalValidateResult } from "../types";
export default class SampleValidator implements InternalValidator {
    validate(id: string): InternalValidateResult;
}
