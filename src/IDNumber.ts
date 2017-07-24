import {Validator, InternalValidateResult, ErrorCode, ValidateResult} from "./types";

import SingaporeNRICValidator from "./providers/SG_NRIC";
import TaiwanIDValidator from "./providers/TW_ID";
import ChineseIdTool from "./providers/CN_ID";

const providerRegistry : any = {
    'SG': {
        'NRIC': SingaporeNRICValidator
    },
    'TW': {
        'ID': TaiwanIDValidator
    },
    'CN': {
        'ID': ChineseIdTool
    }
};

export class IDNumber {

    static getValidator(country: string, document: string) : Validator {
        if (providerRegistry.hasOwnProperty(country)) {
            const countryValidators = providerRegistry[country];
            if (countryValidators.hasOwnProperty(document)) {
                const validator = new countryValidators[document]();
                return <Validator> function (id) {
                    const result:InternalValidateResult = validator.validate(id);
                    const output:ValidateResult = { success: result.success};
                    if (result.hasOwnProperty("reason")) output.reason = <string>ErrorCode[<number>result.reason];
                    if (result.hasOwnProperty("extra")) output.extra = result.extra;
                    return output;
                };
            }
        }
    }
}
