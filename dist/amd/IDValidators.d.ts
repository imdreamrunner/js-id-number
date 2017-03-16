declare module "types" {
    export interface InternalValidator {
        validate(id: string): InternalValidateResult;
    }
    export interface Validator {
        (id: string): ValidateResult;
    }
    export interface ExtraData {
        [key: string]: any;
    }
    export interface InternalValidateResult {
        success: boolean;
        reason?: ErrorCode;
        extra?: ExtraData;
    }
    export interface ValidateResult {
        success: boolean;
        reason?: string;
        extra?: ExtraData;
    }
    export enum ErrorCode {
        error_input_variable = 0,
        error_checksum = 1,
        error_length = 2,
        error_format = 3,
    }
}
declare module "providers/SG_NRIC" {
    import { InternalValidator, InternalValidateResult, ErrorCode } from "types";
    export default class SingaporeNRICValidator implements InternalValidator {
        static validateNRIC(str: string): ErrorCode;
        validate(id: string): InternalValidateResult;
    }
}
declare module "providers/TW_ID" {
    import { InternalValidator, InternalValidateResult } from "types";
    export default class TaiwanIDValidator implements InternalValidator {
        static getTWIDFirstCode(c: string): number;
        validate(id: string): InternalValidateResult;
    }
}
declare module "providers/CN_ID" {
    import { InternalValidator, InternalValidateResult } from "types";
    export default class ChinaIDValidator implements InternalValidator {
        validate(idNumber: string): InternalValidateResult;
    }
}
declare module "IDValidators" {
    import { Validator } from "types";
    export class IDValidators {
        static getValidator(country: string, document: string): Validator;
    }
}
declare module "index" {
    import { IDValidators } from "IDValidators";
    export default IDValidators;
}
declare module "providers/sample" {
    import { InternalValidator, InternalValidateResult } from "types";
    export default class SampleValidator implements InternalValidator {
        validate(id: string): InternalValidateResult;
    }
}
