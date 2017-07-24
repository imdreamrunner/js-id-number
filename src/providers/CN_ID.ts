import {
    InternalValidator, InternalValidateResult, ErrorCode, InternalGenerator,
    InternalGenerateResult
} from "../types";

/*
 * Chinese ID Number Validation & Generation
 *
 * Validation
 * Only support 18-digit validation
 * Logic and code is modified from https://segmentfault.com/a/1190000004437362
 */


const CODE_TO_PROVINCE: any = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
};
const CHECKSUM_WEIGHT = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const CHARACTER_MAPPING : any = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];


export default class ChineseIdTool implements InternalValidator, InternalGenerator {

    validate(idNumber:string):InternalValidateResult {

        if (typeof idNumber !== 'string') {
            return {
                success: false,
                reason: ErrorCode.error_input_variable
            };
        }

        if (idNumber.length != 18) {
            return {
                success: false,
                reason: ErrorCode.error_length
            };
        }

        const birthdayString =
            idNumber.substr(6, 4) + '/' + Number(idNumber.substr(10, 2)) + '/' + Number(idNumber.substr(12, 2));
        const birthdayDate = new Date(birthdayString);
        const reformattedBirthdayString =
            birthdayDate.getFullYear() + '/' + Number(birthdayDate.getMonth() + 1) + '/' + Number(birthdayDate.getDate());
        const currentTime = new Date().getTime();
        const birthdayTime = birthdayDate.getTime();
        let checkSum : number = 0;

        if (!/^\d{17}(\d|x)$/i.test(idNumber)) {
            return {
                success: false,
                reason: ErrorCode.error_format
            }
        }

        if (CODE_TO_PROVINCE[idNumber.substr(0, 2)] === undefined) {
            return {
                success: false,
                reason: ErrorCode.error_format,
                extra: {
                    error_detail: "Province does not exist."
                }
            }
        }

        if (birthdayTime >= currentTime || birthdayString !== reformattedBirthdayString) {
            return {
                success: false,
                reason: ErrorCode.error_format,
                extra: {
                    error_detail: "Birthday is invalid or in the future."
                }
            }
        }

        for (let i = 0; i < 17; i++) {
            checkSum += parseInt(idNumber.substr(i, 1)) * CHECKSUM_WEIGHT[i];
        }

        const residue = CHARACTER_MAPPING[checkSum % 11];

        if (residue !== idNumber.substr(17, 1)) {
            return {
                success: false,
                reason: ErrorCode.error_checksum
            }
        }

        return {
            success: true,
            extra: {
                province: CODE_TO_PROVINCE[idNumber.substr(0, 2)],
                birthday: birthdayString,
                gender: parseInt(idNumber.substr(16, 1)) % 2 ? "Male" : "Female"
            }
        }
    }

    generate(): InternalGenerateResult {
        return undefined;
    }

}