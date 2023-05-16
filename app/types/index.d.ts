import {
  StyleProp,
  ViewProps,
  ViewStyle,
  TextProps,
  TextStyle
} from 'react-native'

export type ViewStyleProps = StyleProp<ViewStyle>
export type TextStyleProps = StyleProp<TextStyle>

export interface RequestBriefPlacesInfoProps {
  type: string,
  fields: string
}

export interface RequestPlaceDetailsInfoProps {
  placeId: string,
  lang: string,
}

export interface BriefPlacesDataProps {
  limit: number,
  skip: number,
  data: Array<PlaceDataProps>
}

export interface CoordinateDataProps {
  lat: number,
  lng: number
}

export interface PlaceOpeningHoursDataProps {
  open_now: boolean,
  periods: Array<{
    date: string,
    day: number,
    time: string
  }>,
  weekday_text: Array<string>
}

export interface PlaceDataProps {
  _id: string,
  name: string;
  address_components?: PlaceOpeningHoursDataProps,
  adr_address?: string,
  business_status?: string,
  current_opening_hours?: PlaceOpeningHoursDataProps,
  editorial_summary?: {
    language: string,
    overview: string
  },
  formatted_address?: string,
  formatted_phone_number?: string,
  geometry?: {
    location: CoordinateDataProps,
    viewport: {
      northeast: CoordinateDataProps,
      southwest: CoordinateDataProps
    }
  },
  icon?: string,
  icon_background_color?: string,
  icon_mask_base_uri?: string,
  international_phone_number?: string,
  opening_hours?: PlaceOpeningHoursDataProps,
  place_id: string,
  plus_code?: {
    compound_code: string,
    global_code: string,
  },
  rating?: number,
  reference?: string,
  types?: Array<string>,
  url?: string,
  user_ratings_total?: number,
  utc_offset?: number,
  vicinity?: string,
  website?: string,
  wheelchair_accessible_entrance?: boolean,
  photos_id?: string,
  reviews_id?: string,
  content_id?: string,
  isRecommended?: boolean,
  numberOfVisited?: number,
  permanently_closed?: boolean,
  curbside_pickup?: boolean,
  delivery?: boolean,
  dine_in?: boolean,
  price_level?: number,
  reservable?: boolean,
  scope?: any,
  secondary_opening_hours?: PlaceOpeningHoursDataProps,
  serves_beer?: boolean,
  serves_breakfast?: boolean,
  serves_brunch?: boolean,
  serves_dinner?: boolean,
  serves_lunch?: boolean,
  serves_vegetarian_food?: boolean,
  serves_wine?: boolean,
  takeout?: any,
  createdAt?: number,
  updateeAt?: number,

  /*
    Hai trường dữ liệu này được thêm trong quá trình lấy data trên mongo.
    Không có sẵn và mặc định là không có tồn tại ở trong place data thật.
    Cho nên khi check thì sẽ luôn là `undefined`
  */
  isLiked: boolean,
  isVisited: boolean
}

export interface PlaceReviewsDataProps {
  author_name: string,
  author_url: string,
  language: string,
  original_language: string,
  profile_photo_url: string,
  rating: number,
  relative_time_description: string,
  text: string,
  time: number,
  translated: boolean,
  createdAt?: number,
  updateeAt?: number
}

export interface PlaceContentTextDataProps<T> {
  vi: T,
  en: T
}

export interface PlaceContentDataProps {
  _id?: string,
  content_id?: string,
  plainText?: PlaceContentTextDataProps<string>,
  plainTextMarkFormat?: PlaceContentTextDataProps<string>
  speech?: PlaceContentTextDataProps<{
    VN_FEMALE_1?: string,
    VN_MALE_1?: string,
    EN_FEMALE_1?: string,
    EN_MALE_1?: string
  }>
}

export interface PlaceDetailsDataProps extends PlaceDataProps {
  reviews?: {
    _id?: string,
    reviews: Array<PlaceReviewsDataProps>,
  }
  content?: {
    _id?: string,
    content?: PlaceContentDataProps
  }
}

// For redux
export type UserRoles = 'GUEST' | 'MEMBER'
export interface ActionProps<T> {
  type: string,
  payload: T
}

// For useAuth
export interface UserForAuthProps {
  emailName: string,
  password: string
}
export interface AuthenticateOptionsProps {
  checkConditionFirst: () => boolean
  callWhenReject: (data?: any) => void 
  callWhenResolve: (data?: any) => void
}

// Use for hooks
export type PlayAudioAsyncFn = () => void
export type StopAudioAsyncFn = () => void
export type PrepareTTSAsyncFn = (audioAsBase64: string) => boolean
export type PrepareMP3AsyncFn = (url: string) => boolean