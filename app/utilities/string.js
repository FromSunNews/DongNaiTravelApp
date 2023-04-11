// by Tuan
// Tham khảo tại Issue: https://github.com/FromSunNews/DongNaiTravelApp/issues/18
// Lưu ý: line sẽ thay thế cho string (có thể tương ứng với câu - sentence), tránh nhầm lẫn với keyword

const notAllowCharInTextRegex = /[\~\!\#\$\%\^\&\*\(\)\@\-\\\/\=\+\_\,\.\|]+/g;

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Một chuỗi ngẫu nhiên có dạng là `text + separator + text`, khi truyền vào hàm này thì sẽ nhận về kết quả là
 * một mảng chuỗi chứa các từ (`text`) trong text đó.
 * 
 * @param {string} line - Chuỗi cần cắt.
 * @param {string} separator - Những kí tự ngăn cắt.
 * @returns Một mảng các `text`.
 */
const splitLineBySeperator = function (line, seperator) {
  return line.split(seperator);
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Một chuỗi ngẫu nhiên có dạng là `text + separator + text`, khi truyền vào hàm này thì sẽ nhận về kết quả là
 * một mảng chuỗi chứa các từ (`text`) trong text đó. Tuy nhiên nó chỉ có lọc được một loại `separator` duy nhất.
 * 
 * @param {string} line - Chuỗi cần cắt.
 * @param {string} separator - Những kí tự ngăn cắt.
 * @returns Chuỗi ban đầu đã được loại bỏ `separator`.
 */
const removeSeparatorFromLine = function (line, seperator) {
  return line.split(seperator).join('');
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * * Chữ, câu "sạch" là chữ, câu không chứa các kí tự được định nghĩa trong `Not Allow Character`.
 * 
 * Một chữ "sạch" được truyền vào function này sẽ nhận về một chữ "sạch" đã được ghi hoa chữ cái đầu.
 * Nếu như `text` là một __câu__ thì nó sẽ trả về lại câu đó mà không làm gì cả.
 * 
 * @param {string} text - Chhữ cần ghi hoa.
 * @returns Chuỗi ban đầu đã được loại bỏ `separator`.
 */
const upperCaseFirstLetter = function (text) {
  if(text.split(" ").length > 1) return text;
  return text[0].toUpperCase() + text.slice(1);
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Một chuỗi bất kì truyền vào function này sẽ nhận về một chuỗi "sạch". Chuỗi "sạch" là chuỗi
 * không chứa các kí tự được định nghĩa trong `Not Allow Character`. Ví dụ:
 * 
 * * `"   Nguyen -- Anh *(* Tuan"` thành `"Nguyen Anh Tuan"`
 * * `"'   (*&@Nguyen )(*)Anh )(&)*&Tuan'  "` thành `"Nguyen Anh Tuan"`
 * 
 * @param {string} line - Chuỗi bất kì.
 * @returns Chuỗi "sạch đã được loại bỏ tất cả các kí tự trong `Not Allow Character`".
 */
const getPureString = function (line) {
  return line.replaceAll(notAllowCharInTextRegex, ' ').trim();
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Một chuỗi bất kì được truyền vào trong function này sẽ nhận về một chuỗi có dạng là `snake_case`, `snake_Case`, `Snake_case`
 * hoặc ... tuỳ theo chuỗi được truyền vào.
 * 
 * @param {string} line - Chuỗi bất kì.
 * @returns Chuỗi có dạng là `snake_case`, `snake_Case`, `Snake_case` hoặc ... tuỳ theo chuỗi được truyền vào.
 */
const toSnakeCase = function (line) {
  let pureString = getPureString(line);
  let result = splitTextBySeperator(pureString, ' ')
    .filter((text) => text !== '')
    .join('_');
  return result;
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Một chuỗi bất kì được truyền vào trong function này sẽ nhận về một chuỗi có dạng là `Title_Case`.
 * 
 * @param {string} line - Chuỗi bất kì.
 * @returns Chuỗi có dạng là `Title_Case`.
 */
const toTitleCase = function (line) {
  let pureString = getPureString(line);
  let result = splitLineBySeperator(pureString, ' ')
    .filter((text) => text !== '')
    .map((text) => upperCaseFirstLetter(text))
    .join(' ');
  return result;
};

const StringUtility = {
  splitLineBySeperator,
  removeSeparatorFromLine,
  upperCaseFirstLetter,
  getPureString,
  toSnakeCase,
  toTitleCase,
};

export default StringUtility;