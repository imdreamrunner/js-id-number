export interface InternalValidator {
    validate(id: string) : InternalValidateResult;
}

export interface InternalGenerator {
    generate(): InternalGenerateResult;
}

export interface Validator {
    (id: string) : ValidateResult;
}

export interface ExtraData {
    [key: string]: any;
}


export interface InternalValidateResult {
    success: boolean;
    reason?: ErrorCode;
    extra?: ExtraData;
}

export interface InternalGenerateResult {
    value: string,
    extra?: ExtraData;
}

export interface ValidateResult {
    success: boolean;
    reason?: string;
    extra?: ExtraData;
}

export enum ErrorCode {
    error_input_variable,  // Input variable is null or not string.
    error_checksum,  // Input ID number fails the checksum validation.
    error_length,
    error_format,
}
