;(function(global) {
var types = {}, providers_SG_NRIC = {}, providers_TW_ID = {}, providers_CN_ID = {}, IDValidators = {}, index = {}, providers_sample = {};
types = function (exports) {
  (function (ErrorCode) {
    ErrorCode[ErrorCode['error_input_variable'] = 0] = 'error_input_variable';
    ErrorCode[ErrorCode['error_checksum'] = 1] = 'error_checksum';
    ErrorCode[ErrorCode['error_length'] = 2] = 'error_length';
    ErrorCode[ErrorCode['error_format'] = 3] = 'error_format';
  }(exports.ErrorCode || (exports.ErrorCode = {})));
  var ErrorCode = exports.ErrorCode;
  return exports;
}(types);
providers_SG_NRIC = function (exports, types_1) {
  var SingaporeNRICValidator = function () {
    function SingaporeNRICValidator() {
    }
    SingaporeNRICValidator.validateNRIC = function (str) {
      // Modified from https://gist.github.com/eddiemoore/7131781
      // Originally base on Based on http://www.samliew.com/icval/
      if (!str || str.length != 9)
        return types_1.ErrorCode.error_length;
      if (!/^[SFGT]\d{7}[A-Z]$/i.test(str))
        return types_1.ErrorCode.error_format;
      str = str.toUpperCase();
      var icChar = [];
      var icNumber = [];
      for (var i = 0; i < 9; i++) {
        icChar[i] = str.charAt(i);
        icNumber[i] = parseInt(icChar[i], 10);
      }
      icNumber[1] *= 2;
      icNumber[2] *= 7;
      icNumber[3] *= 6;
      icNumber[4] *= 5;
      icNumber[5] *= 4;
      icNumber[6] *= 3;
      icNumber[7] *= 2;
      var weight = 0;
      for (var i = 1; i < 8; i++) {
        weight += icNumber[i];
      }
      var offset = icChar[0] == 'T' || icChar[0] == 'G' ? 4 : 0;
      var temp = (offset + weight) % 11;
      var st = [
        'J',
        'Z',
        'I',
        'H',
        'G',
        'F',
        'E',
        'D',
        'C',
        'B',
        'A'
      ];
      var fg = [
        'X',
        'W',
        'U',
        'T',
        'R',
        'Q',
        'P',
        'N',
        'M',
        'L',
        'K'
      ];
      var theAlpha;
      if (icChar[0] == 'S' || icChar[0] == 'T') {
        theAlpha = st[temp];
      } else if (icChar[0] == 'F' || icChar[0] == 'G') {
        theAlpha = fg[temp];
      }
      if (icChar[8] !== theAlpha) {
        return types_1.ErrorCode.error_checksum;
      }
    };
    SingaporeNRICValidator.prototype.validate = function (id) {
      var error = SingaporeNRICValidator.validateNRIC(id);
      return {
        success: !error,
        reason: error
      };
    };
    return SingaporeNRICValidator;
  }();
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.default = SingaporeNRICValidator;
  return exports;
}(providers_SG_NRIC, types);
providers_TW_ID = function (exports, types_2) {
  var TaiwanIDValidator = function () {
    function TaiwanIDValidator() {
    }
    TaiwanIDValidator.getTWIDFirstCode = function (c) {
      if (c == 'I') {
        return 34;
      }
      if (c == 'O') {
        return 35;
      }
      if (c <= 'H') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      }
      if (c <= 'N') {
        return c.charCodeAt(0) - 'J'.charCodeAt(0) + 18;
      }
      if (c <= 'Z') {
        return c.charCodeAt(0) - 'P'.charCodeAt(0) + 23;
      }
    };
    TaiwanIDValidator.prototype.validate = function (id) {
      if (!id || id.length !== 10) {
        return {
          success: false,
          reason: types_2.ErrorCode.error_length
        };
      }
      if (!/^[A-Z]\d{9}$/i.test(id)) {
        return {
          success: false,
          reason: types_2.ErrorCode.error_format
        };
      }
      var start = id.charAt(0);
      var mid = id.substring(1, 9);
      var end = id.charAt(9);
      var iStart = TaiwanIDValidator.getTWIDFirstCode(start);
      var sum = Math.floor(iStart / 10) + iStart % 10 * 9;
      var iflag = 8;
      for (var i = 0; i < mid.length; i++) {
        var c = mid.charAt(i);
        sum += parseInt(c, 10) * iflag;
        iflag--;
      }
      var checksumCorrect = (sum % 10 == 0 ? 0 : 10 - sum % 10) == parseInt(end, 10);
      if (checksumCorrect) {
        return { success: true };
      } else {
        return {
          success: false,
          reason: types_2.ErrorCode.error_checksum
        };
      }
    };
    return TaiwanIDValidator;
  }();
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.default = TaiwanIDValidator;
  return exports;
}(providers_TW_ID, types);
providers_CN_ID = function (exports, types_3) {
  var ChinaIDValidator = function () {
    function ChinaIDValidator() {
    }
    ChinaIDValidator.prototype.validate = function (idNumber) {
      // This Chinese ID validator only supports the 18 digit validation.
      // Logic and code is copied from https://segmentfault.com/a/1190000004437362
      if (typeof idNumber !== 'string') {
        return {
          success: false,
          reason: types_3.ErrorCode.error_input_variable
        };
      }
      var province = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      };
      var birthday = idNumber.substr(6, 4) + '/' + Number(idNumber.substr(10, 2)) + '/' + Number(idNumber.substr(12, 2));
      var d = new Date(birthday);
      var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
      var currentTime = new Date().getTime();
      var time = d.getTime();
      var arrInt = [
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2
      ];
      var arrCh = [
        '1',
        '0',
        'X',
        '9',
        '8',
        '7',
        '6',
        '5',
        '4',
        '3',
        '2'
      ];
      var sum = 0, i, residue;
      if (!/^\d{17}(\d|x)$/i.test(idNumber)) {
        return {
          success: false,
          reason: types_3.ErrorCode.error_format
        };
      }
      if (province[idNumber.substr(0, 2)] === undefined) {
        return {
          success: false,
          reason: types_3.ErrorCode.error_format,
          extra: { error_detail: 'error_location' }
        };
      }
      if (time >= currentTime || birthday !== newBirthday) {
        return {
          success: false,
          reason: types_3.ErrorCode.error_format,
          extra: { error_detail: 'error_birthday' }
        };
      }
      for (i = 0; i < 17; i++) {
        sum += parseInt(idNumber.substr(i, 1)) * arrInt[i];
      }
      residue = arrCh[sum % 11];
      if (residue !== idNumber.substr(17, 1)) {
        return {
          success: false,
          reason: types_3.ErrorCode.error_checksum
        };
      }
      return {
        success: true,
        extra: {
          province: province[idNumber.substr(0, 2)],
          birthday: birthday,
          gender: parseInt(idNumber.substr(16, 1)) % 2 ? 'Male' : 'Female'
        }
      };
    };
    return ChinaIDValidator;
  }();
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.default = ChinaIDValidator;
  return exports;
}(providers_CN_ID, types);
IDValidators = function (exports, types_4, SG_NRIC_1, TW_ID_1, CN_ID_1) {
  var providerRegistry = {
    'SG': { 'NRIC': SG_NRIC_1.default },
    'TW': { 'ID': TW_ID_1.default },
    'CN': { 'ID': CN_ID_1.default }
  };
  var IDValidators = function () {
    function IDValidators() {
    }
    IDValidators.getValidator = function (country, document) {
      if (providerRegistry.hasOwnProperty(country)) {
        var countryValidators = providerRegistry[country];
        if (countryValidators.hasOwnProperty(document)) {
          var validator_1 = new countryValidators[document]();
          return function (id) {
            var result = validator_1.validate(id);
            var output = { success: result.success };
            if (result.hasOwnProperty('reason'))
              output.reason = types_4.ErrorCode[result.reason];
            if (result.hasOwnProperty('extra'))
              output.extra = result.extra;
            return output;
          };
        }
      }
    };
    return IDValidators;
  }();
  exports.IDValidators = IDValidators;
  return exports;
}(IDValidators, types, providers_SG_NRIC, providers_TW_ID, providers_CN_ID);
index = function (exports, IDValidators_1) {
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.default = IDValidators_1.IDValidators;
  // To support both require and ES6 import default.
  for (var attr in IDValidators_1.IDValidators) {
    exports[attr] = IDValidators_1.IDValidators[attr];
  }
  return exports;
}(index, IDValidators);
providers_sample = function (exports, types_5) {
  var SampleValidator = function () {
    function SampleValidator() {
    }
    SampleValidator.prototype.validate = function (id) {
      return {
        success: false,
        reason: types_5.ErrorCode.error_checksum
      };
    };
    return SampleValidator;
  }();
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.default = SampleValidator;
  return exports;
}(providers_sample, types);
global.IDValidators=index.default;}(window));