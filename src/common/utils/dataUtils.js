/* eslint-disable no-extend-native */
/**
 * 去掉日期的时间信息
 * @return {Date} 去掉时间信息的日期
 */
Date.prototype.clearTime = function clearTime() {
  this.setHours(0);
  this.setMinutes(0);
  this.setSeconds(0);
  this.setMilliseconds(0);
  return this;
};
/**
* 日期天数加减
* @param {int} value 需要加减的天数
*/
Date.prototype.addDays = function addDays(value) {
  this.setDate(this.getDate() + value * 1);
  return this;
};
/**
* 日期月份加减
* @param {int} value 需要加减的月份
*/
Date.prototype.addMonths = function addMonths(value) {
  this.setMonth(this.getMonth() + value * 1);
  return this;
};
/**
* 设置日期为当月 1号
*/
Date.prototype.firstDayOfMonth = function firstDayOfMonth() {
  this.setDate(1);
  return this;
};

/**
* 如果日期小于当前日期，则重置为当前日期
* @param {int} value 需要比较的日期 yyyy-mm-dd
* @param {int} type 等于 1 则重置为明天
*/
Date.restDate = function restDate(value, type) {
  const date = value.replace(/-/g, '/');
  const today = new Date().clearTime();

  if (new Date(date) < today) {
      return type === 1 ? today.addDays(1).format('yyyy-MM-dd') : today.format('yyyy-MM-dd');
  }

  return value;
};
/**
* 如果日期小于明天，则重置为明天
* @param {int} value 需要比较的日期 yyyy-mm-dd
*/
Date.restTomorrow = function restTomorrow(value) {
  const date = value.replace(/-/g, '/');
  const tomorrow = new Date().addDays(1).clearTime();
  return new Date(date) < tomorrow ? tomorrow.format('yyyy-MM-dd') : value;
};

/**
* @returns { Date } 返回当天凌晨零点时间
*/
Date.today = function today() {
  return new Date().clearTime();
};

/**
* 和传入的时间进行比较返回时间差天数
* @returns { Number } 天数
*/
Date.prototype.diff = function diff(otherDate) {
  const time = Math.abs(otherDate.getTime() - this.getTime());
  return Math.floor(time / (24 * 60 * 60 * 1000));
};

/**
* @returns {Date} 克隆当前时间对象，返回一个新的对象
*/
Date.prototype.clone = function clone() {
  const time = this.getTime();
  return new Date(time);
};

/**
* 格式化时间
* @param format 格式化 "yyyy-MM-dd hh:mm:ss www"
* @returns {string} 格式化后字符串
*/
Date.prototype.format = function format(dateStr) {
  const o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds(),
  };
  const w = [
      ['日', '一', '二', '三', '四', '五', '六'],
      ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  ];
  let dateStr2 = dateStr;

  if (/(y+)/.test(dateStr2)) {
      dateStr2 = dateStr2.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(dateStr2)) {
      dateStr2 = dateStr2.replace(RegExp.$1, w[RegExp.$1.length - 1][this.getDay()]);
  }
  Object.keys(o).forEach((k) => {
      if (new RegExp(`(${k})`).test(dateStr2)) {
          dateStr2 = dateStr2.replace(RegExp.$1, (`00${o[k]}`).substr((`${o[k]}`).length));
      }
  });
  return dateStr2;
};

/**
* 计算间隔时间
* @param {[type]} cDate [description]
* @param {[type]} mode  [description]
*/
Date.prototype.dayDiff = function dayDiff(data) {
  try {
      data.getYear();
  } catch (e) {
      return 0;
  }
  const base = 24 * 60 * 60 * 1000;
  const result = Math.abs(this - data) / base;
  return parseInt(result, 10);
};

/**
* 比较时间
* @param  {[type]} date1 [description]
* @param  {[type]} date2 [description]
* @return {[type]}       [description]
*/
Date.prototype.compareDate = function compareDate(date1, date2) {
  const date11 = new Date(date1.replace(/-/g, '/'));
  const date22 = new Date(date2.replace(/-/g, '/'));
  return date11 - date22;
};

/**
* 加法
*/
Number.prototype.add = function add(arg) {
  let r1;
  let r2;
  try {
      r1 = this.toString().split('.')[1].length;
  } catch (e) {
      r1 = 0;
  }
  try {
      r2 = arg.toString().split('.')[1].length;
  } catch (e) {
      r2 = 0;
  }
  const m = 10 ** Math.max(r1, r2);
  return (this * m + arg * m) / m;
};

/**
* 减法
*/
Number.prototype.sub = function sub(arg) {
  return this.add(-arg);
};

/**
* 乘法
*/
Number.prototype.mul = function mul(arg) {
  let m = 0;
  const s1 = this.toString();
  const s2 = arg.toString();
  // eslint-disable-next-line no-empty
  try {
      m += s1.split('.')[1].length;
  } catch (e) {}
  // eslint-disable-next-line no-empty
  try {
      m += s2.split('.')[1].length;
  } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m);
};
