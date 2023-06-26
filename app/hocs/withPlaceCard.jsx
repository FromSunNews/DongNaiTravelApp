import React from 'react'
import {
  ViewProps
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import {
  usePlaceDetailsState,
  usePlaceDetailsActions,
  usePlaceDetails,
  useBriefPlacesActions,
  usePlaceInteractionActions
} from 'customHooks/usePlace'

import {
  updateUserByCaseAPI
} from 'apis/axios'

import StringUtility from 'utilities/string'
import {
  UPDATE_USER_CASES
} from 'utilities/constants'

import { 
  WithPlaceCardWrappedComponentProps
} from 'types/index.d.ts'
import FunctionsUtility from 'utilities/functions'

/**
 * @typedef PlaceCardProps
 * @property {PlaceDataProps} place Thông tin về một địa điểm của một nơi nào đó.
 * @property {string} typeOfBriefPlace Type của brief places.
 * @property {number} placeIndex Index của place trong data của briefPlace. Cái này dùng để tìm place cho nhanh, khỏi dùng vòng lặp.
 */

/**
 * #### HOC
 * 
 * Đây là một Higher order component, chứa các logic cơ bản của một Place Card bao gồm:
 * - Yêu thích một địa điểm
 * - Đã ghé thăm một địa điểm
 * @param {(props: WithPlaceCardWrappedComponentProps) => JSX.Element} Component Component này sẽ dùng các logic trong `withPlaceCard`.
 * @example
 * ...
 * import { withPlaceCard } from 'hocs/withPlaceCard'
 * 
 * function HorizontalPlaceCard({...}) {...}
 * 
 * export default withPlaceCard(HorizontalPlaceCard)
 * 
 * // OR
 * import { withPlaceCard } from 'hocs/withPlaceCard'
 * 
 * function VerticalPlaceCard({...}) {...}
 * 
 * export default withPlaceCard(VerticalPlaceCard)
 * ...
 */
export function withPlaceCard(WrappedComponent) {
  /**
   * Hàm này dùng để lấy text content trong `adr_address`. Mặc định là 2 thẻ
   * `<span class"locality"></span>` và `<span class"region"></span>`. Nếu như có gì
   * thay đổi thì vào trong HOC này để sửa đổi.
   */
  const getTextContentInHTMLTag = StringUtility.createTextContentInHTMLTagGetter("<span class=\"(locality|region)\">", "<\/span>");

  /**
   * Component này sẽ nhận một component khác và bọc nó lại, đồng thời function này sẽ truyền logic lại cho
   * component được bọc đó (WrappedComponent).
   * @param {ViewProps & PlaceCardProps} props Props của component.
   */
  return function({ place, placeIndex, typeOfBriefPlace, ...props }) {
    const { addPlaceDetails } = usePlaceDetailsActions();
    const { updateBriefPlace } = useBriefPlacesActions(typeOfBriefPlace);
    const { extendedPlaceInfo, likePlace } = usePlaceInteractionActions(place);
    const navigation = useNavigation();
  
    /**
     * Hàm này dùng để mở một place details.
     */
    const handlePressImageButton = () => {
      addPlaceDetails(place);
      navigation.push('PlaceDetailScreen', {
        placeId: place.place_id,
        typeOfBriefPlace: typeOfBriefPlace,
        handleShareToSocial: handleShareToSocial
      });
    }
  
    /**
     * Hàm này dùng để yêu thích / bỏ yêu thích một place, nó sẽ gửi id của place về server và tự server nó sẽ xử lý.
     */
    const handleLikeButton = () => likePlace(
      (data, state) => updateBriefPlace(place.place_id, placeIndex, { isLiked: state }),
      (state) => updateBriefPlace(place.place_id, placeIndex, { isLiked: state })
    )

    // Hàm này dùng để cho việc share ảnh 
    const handleShareToSocial = () => {
      console.log('place', place)
      const message = `Hãy cùng khám phá ${place.name} với mình nhé!`
      const url = place.place_photos[0]
      console.log("🚀 ~ file: withPlaceCard.jsx:102 ~ handleShareToSocial ~ url:", url)
      const title = 'DongNaiTravelApp'

      FunctionsUtility.shareImageToSocial(message, url, title)
    }

    return (
      <WrappedComponent
        {...props}
        place={place}
        placeIndex={placeIndex}
        typeOfBriefPlace={typeOfBriefPlace}
        extendedPlaceInfo={extendedPlaceInfo}
        addPlaceDetails={addPlaceDetails}
        updateBriefPlace={updateBriefPlace}
        getTextContentInHTMLTag={getTextContentInHTMLTag}
        handlePressImageButton={handlePressImageButton}
        handleLikeButton={handleLikeButton}
        handleShareToSocial={handleShareToSocial}
      />
    )
  }
}