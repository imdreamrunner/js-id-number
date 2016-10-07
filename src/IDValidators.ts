///<reference path='types'/>
///<reference path='sg'/>

import validateSGIC = IDValidator.sg.validateSGIC;
export function getValidator(country: string, document: string) {
    return validateSGIC;
}
