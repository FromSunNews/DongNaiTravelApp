import {
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native'

/**
 * @typedef {ViewProps} ViewProps Các properties của `View`.
 */

/**
 * @typedef {StyleProp<ViewStyle>} ViewStyles Các properties của View Style.
 */

/**
 * @typedef RequestBriefPlacesInfoProps
 * @property {string} type Loại địa điểm như là công viên, nhà hàng, quán cafe...
 * @property {string} fields Những data field mong muốn.
 */

/**
 * @typedef BriefPlacesDataProps
 * @property {number} limit Giới hạn số record yêu cầu server trả về.
 * @property {number} skip Bỏ qua một số record nào đó.
 * @property {Array<any>} data Dữ liệu của Brief Places.
 */

/**
 * @typedef ReviewDataProps
 * @property {string} author_name
 * @property {string} author_url
 * @property {string} language
 * @property {string} original_language
 * @property {string} profile_photo_url
 * @property {number} rating
 * @property {string} relative_time_description
 * @property {string} text
 * @property {number} time
 * @property {boolean} translated
 */

export {}