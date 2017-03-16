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
export declare enum ErrorCode {
    error_input_variable = 0,
    error_checksum = 1,
    error_length = 2,
    error_format = 3,
}
