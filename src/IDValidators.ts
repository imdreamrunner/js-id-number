///<reference path='types'/>
///<reference path='sg'/>

import validateSGIC = IDValidators.sg.validateSGIC;
export function getValidator(country: string, document: string) {
    return validateSGIC;
}
