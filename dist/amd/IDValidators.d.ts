declare namespace IDValidators {
    interface ValidateResult {
        result: boolean;
        reason?: string;
    }
}
declare namespace IDValidators.sg {
    function validateSGIC(ic: string): ValidateResult;
}
declare module "IDValidators" {
    import validateSGIC = IDValidators.sg.validateSGIC;
    export function getValidator(country: string, document: string): typeof validateSGIC;
}
