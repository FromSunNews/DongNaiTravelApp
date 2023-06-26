import { 
  getFocusedRouteNameFromRoute,
  RouteProp,
  ParamListBase
} from "@react-navigation/native";
import { Platform, Share } from "react-native";
import StringUtility from "./string";
import * as FileSystem from 'expo-file-system';
import { callWithGlobalLoading } from "./reduxStore";

/*
  File này chủ yếu là các function linh tinh.
*/

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Hàm trả về tên của một route đang được active. Nếu như muốn setup title cho cho các screen trong navigator con, ví dụ như là
 * một Stack navigator nằm trong screen của Tab navigator, thì dùng hàm này cho thuộc tính `options` của Tab screen.
 * 
 * __How to use?__
 * @example
 * ```jsx
 * <Tab.Screen
 *  options={({route}) => (
 *    {
 *      title: FunctionsUtility.getHeaderTitle(route)
 *    }
 *  )}
 * />
 * ```
 *
 * @param {RouteProp<ParamListBase, string>} route Tên của route.
 * @returns Trả về tên của route đang được active.
 */
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName;
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Hàm sẽ so sánh 2 Số, chuỗi đối tượng hoặc function nào đó (gọi chung là đối tượng đi). Để kiểm tra xem
 * 2 đối tượng đó có giống nhau không? Không chỉ về ref mà còn là key và value.
 * @param {any} a Số, chuỗi, đối tượng hoặc function đầu tiên muốn so sánh.
 * @param {any} b Số, chuỗi, đối tượng hoặc function thứ hai muốn so sánh.
 * @returns {boolean}
 * 
 * @example
 * 
 * ...
 * let obj1 = { a: 123, b: [ { c: 1 }, 23 ] }
 * let obj2 = { a: 123, b: [ { c: 1 }, 23 ] }
 * 
 * console.log(deepCompare(obj1, obj2)); // Output: true
 * ...
 */
function deepCompare(a, b) {
  let check = true;

  // Check trước ở đây, vì a và b có thể là số, chuỗi.ư
  // Tuy nhiên a và b cùng lưu một ref của một object hoặc array, thì có thể bằng nhau. Nhưng trường hợp này check sau.
  check = a === b;

  // Nếu cả a và b là function thì check luôn ở đây.
  if(a instanceof Function && b instanceof Function) {
    console.log(a);
    console.log(b);
    return a.toString() === b.toString();
  }
  
  // Nếu là array
  if (a instanceof Array) {
    check = true;
    if (a.length !== b.length) return false;
    // Nếu như a và b bằng ref (địa chỉ vùng nhớ) thì trả về true luôn, đỡ phải so sánh.
    if(a === b) return true;
    for (let index in a) {
      if (a[index] instanceof Object && !deepCompare(a[index], b[index]))
        return false;
      if (!(a[index] instanceof Object) && a[index] !== b[index]) return false;
    }
  }
  
  // Nếu là object
  if (a instanceof Object && !(a instanceof Array)) {
    let propsA = Object.getOwnPropertyNames(a);
    let propsB = Object.getOwnPropertyNames(b);
    check = true;
    // Ở đây thì mình chỉ cần check length của propsA và propsB
    if(propsA.length !== propsB.length) return false;
    // Nếu như a và b bằng ref (địa chỉ vùng nhớ) thì trả về true luôn, đỡ phải so sánh.
    if(a === b) return true;
    for (let prop in a) {
      if (!b[prop]) return false;
      if (!deepCompare(a[prop], b[prop])) return false;
    }
  }
  return check;
}

/**
 * @author FSN
 * @description Hàm này để kiểm tra xem text có đúng với regex đã cung cấp hay chưa
 * @param {string} text đoạn văn bản được cung cấp
 * @param {RegExp} regex regex được cung cấp
 * @returns {boolean}
 */
function validateRegex(text, regex) {
  return regex.test(text)
}

/**
 * Trả về một mảng mới đã remove item theo `condition`. Không nên dùng mảng
 * quá sâu.
 * @param {Array<any>} arr 
 * @param {(ele: any, index: number) => any} selectValueToCompare 
 * @param {value} value 
 */
function removeFrom(arr, selectValueToCompare, value) {
  if(arr.length === 1) return [];
  let cpArr = arr.slice();
  return cpArr.filter((ele, index) => selectValueToCompare(ele, index) !== value)
}

/**
 * Dùng hàm này với async function để delay một tác vụ nào đó.
 * @param {() => void} callBack 
 * @param {number} timeout 
 * @returns 
 */
const wait = (callBack, timeout) => {
  return new Promise((res) => {
    setTimeout(() => {
      // Promise đang `await` res() thực thi.
      res(callBack())
    }, timeout)
  })
}

/**
 * Hàm này dùng để bind tất cả các methods trong một object với `obj` đó.
 * @param {any} obj object cần bind tất cả các method của nó.
 */
function autoBind(obj) {
  let propNames = Object.getOwnPropertyNames(obj);
  for(let propName of propNames) {
    if(propName !== 'constructor' && obj[propName]) {
      obj[propName] = obj[propName].bind(obj)
    }
  }
}

/**
 * @author FSN
 * @description Đây là hàm dùng để chia sẻ hình ảnh của bài viết lên các nền tảng mạng xả hội
 * @param {string} message lời nhắn khi chia sẻ
 * @param {string} url đường dẫn hoặc dạng base64 của hình ảnh muốn chia sẻ
 * @param {string} title tiêu đề của bài chia sẻ
 * @returns {void}
 */
const shareImageToSocial = async (message, url, title) => {
  let base64Data
  await callWithGlobalLoading(async () => {
    // Kiểm tra xem url này có phải là một đường dẫn hay không 
    if (StringUtility.hasLink(url)) {
      base64Data = 'data:image/jpeg;base64,'
      try {
        const { uri } = await FileSystem.downloadAsync(
          url,
          FileSystem.documentDirectory + 'bufferimg.png'
        );
    
        base64Data += await FileSystem.readAsStringAsync(uri, {
          encoding: 'base64',
        });
  
      } catch (err) {
        console.log(err);
      }
    } else {
      base64Data = url
    }
  })

  if (Platform.OS === "android") {
    Share.share({
      message: message, // supporting android
      url: base64Data, // not supporting
      title: title,
    })
      .then((result) => console.log(result))
      .catch((errorMsg) => console.log(errorMsg))
  } else if (Platform.OS === "ios") {
    Share.share({
      message: message, // supporting android
      url: base64Data, // not supporting
      title: title,
     })
    
     .then((result) => console.log(result))
      .catch((errorMsg) => console.log(errorMsg))
  }
}

const FunctionsUtility = {
  getHeaderTitle,
  deepCompare,
  validateRegex,
  removeFrom,
  wait,
  autoBind,
  shareImageToSocial
}

export default FunctionsUtility;