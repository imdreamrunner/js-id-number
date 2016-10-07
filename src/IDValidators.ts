///<reference path='types'/>
///<reference path='sg'/>
///<reference path='tw'/>

import validateSGIC = IDValidator.sg.validateSGIC;
import validateTWID = IDValidator.tw.validateTWID;
export function getValidator(country: string, document: string) {
    if (country == 'SG') {
        return validateSGIC;
    } else if (country == 'TW') {
        return validateTWID;
    }
}
