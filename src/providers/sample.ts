///<reference path='../types.ts'/>

import {InternalValidator, InternalValidateResult, ErrorCode} from "../types";

export default class SampleValidator implements InternalValidator {
    validate(id:string):InternalValidateResult {
        return {
            success: false,
            reason: ErrorCode.error_checksum
        };
    }

}