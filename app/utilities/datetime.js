/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Nhận vào một năm để check xem năm đó có phải là năm nhuận hay không?
 * 
 * @param {number} year - Năm bất kì.
 * @returns Trả về `true` nếu như là `year` là năm nhuận, ngược lại là `false`.
 */
const isLeapYear = function(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Nhận vào số đại diện của tháng, trả về ngày trong tháng đó.
 * 
 * @param {number} month - Năm bất kì.
 * @returns Trả về số ngày trong `month`.
 */
const getDayInMonth = function(month) {
  if (month < 0 || month > 12) return 0;
  if (month === 2) return isLeapYear(new Date().getFullYear()) ? 29 : 28;
  return (month % 2 !== 0 && month < 8) ||
    (month % 2 === 0 && month > 8) ||
    month === 8 ||
    month === 1
    ? 31
    : 30;
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Nhận vào `timeStamp`, trả về ngày tháng đầy đủ ở dạng chuỗi.
 * 
 * @param {number} timeStamp - Một mốc thời gian tính bằng `mili second`.
 * @returns `Thứ tháng ngày năm giờ múi giờ` ở dạng chuỗi.
 */
const getDateInString = function(timeStamp) {
  return new Date(timeStamp).toString();
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Nhận vào `timeStamp`, trả về ngày tháng ngắn gọn ở dạng chuỗi.
 * 
 * @param {number} timeStamp - Một mốc thời gian tính bằng `mili second`.
 * @returns `Ngày tháng năm giờ` ở dạng chuỗi.
 */
const getDateInLocaleString = function(timeStamp) {
  return new Date(timeStamp).toLocaleString();
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Nhận vào `timeStamp`, trả về một `TimeCollection`.
 * `TimeCollection` sẽ bao gồm:
 * * `dateObj`: object
 * * `hour`: number
 * * `minute`: number
 * * `second`: number
 * * `date`: number
 * * `month`: number
 * * `year`: number
 * * `inLocaleTimeString`: string
 * * `inString`: string
 * 
 * @param {number} timeStamp - Một mốc thời gian tính bằng `mili second`.
 * @returns `TimeCollection`.
 */
const getTimeCollection = function(timeStamp = Date.now()) {
  const dateByTS = new Date(timeStamp);
  return {
    dateObj: dateByTS,
    hour: dateByTS.getHours(),
    minute: dateByTS.getMinutes(),
    second: dateByTS.getSeconds(),
    date: dateByTS.getDate(),
    month: dateByTS.getMonth(),
    year: dateByTS.getFullYear(),
    inLocaleTimeString: dateByTS.toLocaleString(),
    inString: dateByTS.toString(),
  };
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Nhận vào `timeStamp`, trả về `TimeDistance`.
 * `TimeDistance` bao gồm:
 * * `type`: string (`year` | `month` | `day` | `hour` | `minute` | `second`)
 * * `distance`: number
 * 
 * @param {number} timeStampThen - Một mốc thời gian "bắt đầu" tính bằng `mili second`.
 * @param {number} timeStampNow - Một mốc thời gian "hiện tại" tính bằng `mili second`.
 * @returns `TimeDistance`.
 */
const getTimeDistance = function(timeStampThen, timeStampNow = Date.now()) {
  const distanceInSecond = parseInt(
    Math.abs(timeStampNow - timeStampThen) / 1000
  );
  if (distanceInSecond >= 0 && distanceInSecond < 60) {
    return { type: 'minute', distance: distanceInSecond };
  }

  const distanceInMinute = parseInt(distanceInSecond / 60);
  if (distanceInMinute > 0 && distanceInMinute < 60) {
    return { type: 'minute', distance: distanceInMinute };
  }

  const distanceInHour = parseInt(distanceInMinute / 60);
  if (distanceInHour > 0 && distanceInHour < 24) {
    return { type: 'hour', distance: distanceInHour };
  }

  const distanceInDay = parseInt(distanceInHour / 24);
  const startMonth = new Date(timeStampThen).getMonth() + 1;
  const dayInMonthOfThen = getDayInMonth(startMonth);
  if (distanceInDay > 0 && distanceInDay < dayInMonthOfThen) {
    return { type: 'day', distance: distanceInDay };
  }

  const distanceInMonth = parseInt(distanceInDay / dayInMonthOfThen);
  if (distanceInMonth > 0 && distanceInMonth < 12) {
    return { type: 'month', distance: distanceInMonth };
  }

  const distanceInYear = parseInt(distanceInMonth / 12);
  if (distanceInMonth > 12) {
    return { type: 'year', distance: distanceInYear };
  }
};

const getShortDateString = function(timeStamp, options = {day: 'numeric', month: 'short', year: 'numeric'}) {
  const date = new Date(timeStamp);
  return date.toLocaleString(undefined, options);
}

const toMinute = function(second) {
  return parseInt(second / 60);
}

const toHour = function(second) {
  return parseInt(second / 3600);
}

const toDay = function(second) {
  return parseInt(second / 86400);
}

const DateTimeUtility = {
  isLeapYear,
  getDateInString,
  getDateInLocaleString,
  getTimeCollection,
  getTimeDistance,
  getDayInMonth,
  getShortDateString,
  toMinute,
  toHour,
  toDay
};

export default DateTimeUtility;
