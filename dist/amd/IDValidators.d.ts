declare namespace IDValidator {
    interface ValidateResult {
        result: boolean;
        reason?: string;
    }
}
declare namespace IDValidator.sg {
    function validateSGIC(ic: string): ValidateResult;
}
declare module "IDValidators" {
    import validateSGIC = IDValidator.sg.validateSGIC;
    export function getValidator(country: string, document: string): typeof validateSGIC;
}
