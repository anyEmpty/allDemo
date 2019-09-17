const checkFunc = {
    // 身份证
    checkCardId(value) {
        const a = value;
        const cityKey = [
            '11',
            '12',
            '13',
            '14',
            '15',
            '21',
            '22',
            '23',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '50',
            '51',
            '52',
            '53',
            '54',
            '61',
            '62',
            '63',
            '64',
            '65',
            '71',
            '81',
            '82',
            '91'
        ];
        let isError = false;

        if (!a || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(a)) {
            isError = true;
        } else if (cityKey.indexOf(a.substr(0, 2)) === -1) {
            isError = true;
        } else if (a.length === 18) {
            const b = a.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = b[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] !== b[17]) {
                isError = true;
            }
        }
        return isError;
    }
};

/**
 * 校验方法对象
 * @reg 校验正则 与checkFunc 二选一
 * @checkFunc 校验方法 与reg 二选一
 * @preTips 提示语前缀
 * @errText 提示语正文
 */
const ruleList = {

    // 校验数字
    checkNum: {
        reg: /^[0-9]+$/g,
        preTips: '',
        errText: '只能包含数字,请正确填写'
    },
    // 校验是否包含表情
    checkEmoji: {
        reg: /^[\u4e00-\u9fffa-zA-Z，。？！、：；“”（） 《》{}【】~——·＃＊|〖〗『』〔〕「」¥￥…,.?;':'{}[\]/!~@#$%^&*()\-\\`_+=><0-9]+$/g,
        preTips: '',
        errText: '只允许输入汉字、字母、数字以及标点符号，生僻字可用拼音代替，请正确填写'
    },

    checkMobileNumber: {
        reg: /^1[3456789]\d{9}$/,
        preTips: '手机号',
        errText: '输入错误,请正确填写'
    },

    checkEmailNo: {
        reg: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        preTips: '邮箱',
        errText: '输入错误,请正确填写'
    },

    checkBlankSpace: {
        reg: /[\s]+/g,
        preTips: '',
        errText: '不能包含空格'
    },

    checkCardId: {
        checkFunc: checkFunc.checkCardId,
        preTips: '身份证',
        errText: '输入错误,请正确填写'
    }
};

/**
 * @val 需要校验的字符串
 * @rules 校验规则  '|'表示多个校验规则只需满足1个， '&' 表示多个校验规则都要满足 不支持同时包含 | &
 * @noEmpty 是否校验非空
 * @preTips 提示语前缀
 * @min 最小长度
 * @max 最大长度
 */
export default (val, rules, noEmpty = false, preTips, min, max) => {
    if (val) {
        val = val.toString().trim();
    }

    // 非空校验
    if (!val) {
        return {
            isError: noEmpty,
            val,
            tipText: noEmpty ? `${preTips || '**'}不能为空` : ''
        };
    }

    if (min && val.length < min) {
        return {
            isError: true,
            val,
            tipText: `${preTips || '**'}字符长度不能小于${min}`
        };
    }

    if (max && val.length > max) {
        return {
            isError: true,
            val,
            tipText: `${preTips || '**'}字符长度不能大于${max}`
        };
    }

    let isError = true;
    // 校验 '或'
    let r1 = rules.split('|');
    if (r1.length > 1) {

        for (let i = 0; i < r1.length; i++) {
            let t = ruleList[r1[i]];
            if (t) {
                t.reg && (isError = !t.reg.test(val));
                t.checkFunc && (isError = t.checkFunc(val));

                if (!isError) {
                    break;
                }
            }
        }

        return {
            isError,
            val,
            tipText: isError ? `${preTips || '**'}输入错误` : ''
        };
    }

    // 规则同时满足 1 或多个 &  同时满足
    let t2 = rules.split('&');
    isError = false;
    let tipText = '';

    for (let i = 0; i < t2.length; i++) {
        let q = ruleList[t2[i]];
        if (q) {
            q.reg && (isError = q.reg.test(val));
            q.checkFunc && (isError = q.checkFunc(val));
            if (isError) {
                tipText = (preTips || q.preTips || '**') + q.errText;
                break;
            } 
        }
    }

    return {
        isError,
        val,
        tipText
    };
};
