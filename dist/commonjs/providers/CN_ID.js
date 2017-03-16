///<reference path='../types.ts'/>
"use strict";
var types_1 = require("../types");
var ChinaIDValidator = (function () {
    function ChinaIDValidator() {
    }
    ChinaIDValidator.prototype.validate = function (idNumber) {
        // This Chinese ID validator only supports the 18 digit validation.
        // Logic and code is copied from https://segmentfault.com/a/1190000004437362
        if (typeof idNumber !== 'string') {
            return {
                success: false,
                reason: types_1.ErrorCode.error_input_variable
            };
        }
        var province = {
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
        var birthday = idNumber.substr(6, 4) + '/' + Number(idNumber.substr(10, 2)) + '/' + Number(idNumber.substr(12, 2));
        var d = new Date(birthday);
        var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
        var currentTime = new Date().getTime();
        var time = d.getTime();
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var sum = 0, i, residue;
        if (!/^\d{17}(\d|x)$/i.test(idNumber)) {
            return {
                success: false,
                reason: types_1.ErrorCode.error_format
            };
        }
        if (province[idNumber.substr(0, 2)] === undefined) {
            return {
                success: false,
                reason: types_1.ErrorCode.error_format,
                extra: {
                    error_detail: "error_location"
                }
            };
        }
        if (time >= currentTime || birthday !== newBirthday) {
            return {
                success: false,
                reason: types_1.ErrorCode.error_format,
                extra: {
                    error_detail: "error_birthday"
                }
            };
        }
        for (i = 0; i < 17; i++) {
            sum += parseInt(idNumber.substr(i, 1)) * arrInt[i];
        }
        residue = arrCh[sum % 11];
        if (residue !== idNumber.substr(17, 1)) {
            return {
                success: false,
                reason: types_1.ErrorCode.error_checksum
            };
        }
        return {
            success: true,
            extra: {
                province: province[idNumber.substr(0, 2)],
                birthday: birthday,
                gender: parseInt(idNumber.substr(16, 1)) % 2 ? "Male" : "Female"
            }
        };
    };
    return ChinaIDValidator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChinaIDValidator;
