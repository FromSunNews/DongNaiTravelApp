import React from "react";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserByCaseAPI
} from 'request_api'

import {
  addPlaceDetailsState,
  increaseSkipBriefPlacesAmountState,
  decreaseSkipBriefPlacesAmountState,
  updateBriefPlaceState,
  clearAllBriefPlaces,
  fetchBriefPlacesByTypeAsyncThunk,
  fetchPlaceDetailsByIdAsyncThunk,
  briefPlacesSeletor,
  placeDetailsSelector,
  clearPlaceDetailsState
} from 'redux/places/PlacesSlice'

import {
  UPDATE_USER_CASES
} from 'utilities/constants'

import {
  PlaceDataProps,
  PlaceDetailsDataProps,
  RequestPlaceDetailsInfoProps
} from 'types/index.d.ts'

export const {
  useBriefPlaces,
  useBriefPlacesActions
} = (function() {
  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createInscreaseSkipFn = (dispatch, typeOfBriefPlaces) =>
  /**
   * Hàm này dùng để tăng số brief places cần bỏ qua khi request về server.
   * @returns 
   */
  () => dispatch(increaseSkipBriefPlacesAmountState(typeOfBriefPlaces));

  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createDescreaseSkipFn = (dispatch, typeOfBriefPlaces) =>
  /**
   * Hàm này dùng để giảm số brief places cần bỏ qua khi request về server.
   * @returns 
   */
  () => dispatch(decreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));

  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createClearAllFn = dispatch =>
  /**
   * Hàm này dùng để dọn hết brief places.
   * @returns 
   */
  () => dispatch(clearAllBriefPlaces());

  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createUpdateBriefPlaceFn = (dispatch, typeOfBriefPlaces) =>
  /**
   * Hàm này dùng để update dữ liệu của một brief place trong brief places theo type.
   * @returns 
   */
  (placeId, placeIndex, updateData) => dispatch(updateBriefPlaceState({placeId, placeIndex, typeOfBriefPlaces, updateData}))

  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createFetchBriefPlaceByTypeFn = (dispatch, typeOfBriefPlaces) =>
  /**
   * Hàm này dùng để yêu cầu dữ liệu của brief places từ server theo type.
   * @returns 
   */
  fields => dispatch(fetchBriefPlacesByTypeAsyncThunk({type: typeOfBriefPlaces, fields}))

  return {
    /**
     * Hook này dùng để sử dụng state và actions của `briefPlaces` trong `PlaceSlice`
     * @param {string} typeOfBriefPlaces 
     * @returns 
     */
    useBriefPlaces: function(typeOfBriefPlaces) {
      let places = useSelector(state => briefPlacesSeletor(state, typeOfBriefPlaces));
      let dispatch = useDispatch();

      let {
        increaseSkip,
        decreaseSkip,
        clearAll,
        updateBriefPlace,
        fetchBriefPlaceByType
      } = React.useMemo(() => ({
        increaseSkip: createInscreaseSkipFn(dispatch, typeOfBriefPlaces),
        decreaseSkip: createDescreaseSkipFn(dispatch, typeOfBriefPlaces),
        clearAll: createClearAllFn(dispatch),
        updateBriefPlace: createUpdateBriefPlaceFn(dispatch, typeOfBriefPlaces),
        fetchBriefPlaceByType: createFetchBriefPlaceByTypeFn(dispatch, typeOfBriefPlaces)
      }), [typeOfBriefPlaces]);

      return {
        places,
        increaseSkip,
        decreaseSkip,
        clearAll,
        updateBriefPlace,
        fetchBriefPlaceByType
      }
    },

    /**
     * Hook này dùng để sử dụng actions của `briefPlaces` trong `PlaceSlice`
     * @param {string} typeOfBriefPlaces 
     * @returns 
     */
    useBriefPlacesActions: function(typeOfBriefPlaces) {
      let dispatch = useDispatch();

      let {
        increaseSkip,
        decreaseSkip,
        clearAll,
        updateBriefPlace,
        fetchBriefPlaceByType
      } = React.useMemo(() => ({
        increaseSkip: createInscreaseSkipFn(dispatch, typeOfBriefPlaces),
        decreaseSkip: createDescreaseSkipFn(dispatch, typeOfBriefPlaces),
        clearAll: createClearAllFn(dispatch),
        updateBriefPlace: createUpdateBriefPlaceFn(dispatch, typeOfBriefPlaces),
        fetchBriefPlaceByType: createFetchBriefPlaceByTypeFn(dispatch, typeOfBriefPlaces)
      }), [typeOfBriefPlaces]);

      return {
        increaseSkip,
        decreaseSkip,
        clearAll,
        updateBriefPlace,
        fetchBriefPlaceByType
      }
    }
  }
})();

/*
  usePlaceDetails được chia ra làm 2 hook nhỏ hơn là: usePlaceDetailsActions và usePlaceDetailsState.
  Bời vì sẽ có những component không cần dùng state mà dùng action để update state, thì nó sẽ gây việc
  re-render không mong muốn. Ví dụ có 2 component A và B:
  - Nếu như theo như các thông thường, thì A sẽ update state thì B sẽ được render lại, tuy nhiên A cũng sẽ
  render lại.
  - Nếu như chia hook ra làm hai, thì khi A update state thì B sẽ được render lại, nhưng A sẽ không.
*/

export const {
  usePlaceDetails,
  usePlaceDetailsState,
  usePlaceDetailsActions,
} = (function() {
  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createAddPlaceDetailsFn = dispatch =>
  /**
   * Hàm này dùng để thêm một place details vào trong store.
   * @param {PlaceDetailsDataProps} placeDetails Dữ liệu của một place, không nhất thiết phải có `content` hay `reviews`.
   * @returns 
   */
  placeDetails => dispatch(addPlaceDetailsState(placeDetails));
  
  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createFetchPlaceDetailsFn = dispatch =>
  /**
   * Hàm này dùng để lấy dữ liệu chi tiết của một place trên server theo `place_id` và `lang`.
   * @param {string} placeId là `place_id` của một place.
   * @param {object} options Options để gọi async thunk.
   * @param {string} options.lang ngôn ngữ mong muốn của dữ liệu trả về (với các trường có hỗ trợ nhiều ngôn ngữ).
   * @param {boolean} options.canGetComplete Có thể lấy dữ liệu đủ dùng cho place details hay không?
   * @param {boolean} options.canGetFull Có thể lấy toàn bộ dữ liệu cho place details hay không?
   * @returns 
   */
  (placeId, options) => dispatch(fetchPlaceDetailsByIdAsyncThunk({placeId, options}));
  
  /**
   * @param {Dispatch<AnyAction>} dispatch 
   * @returns 
   */
  let createClearPlaceDetailsFn = dispatch =>
  /**
   * Hàm này dùng để clear details của một place nào đo theo `place_id`. 
   * @param {string} placeId là `place_id` của một place.
   * @returns 
   */
  placeId => dispatch(clearPlaceDetailsState(placeId));

  return {
    /**
     * Hook này dùng để subscribe vào PlaceSlice và dùng các action của nó.
     * @param {string} placeId là `place_id` của một place.
     * @returns 
     */
    usePlaceDetails: function(placeId) {
      let placeDetails = useSelector(state => placeDetailsSelector(state, placeId));
      let dispatch = useDispatch();
      
      let {
        addPlaceDetails,
        fetchPlaceDetails,
        clearPlaceDetails,
      } = React.useMemo(() => ({
        addPlaceDetails: createAddPlaceDetailsFn(dispatch),
        fetchPlaceDetails: createFetchPlaceDetailsFn(dispatch),
        clearPlaceDetails: createClearPlaceDetailsFn(dispatch)
      }));

      return {
        placeDetails,
        addPlaceDetails,
        fetchPlaceDetails,
        clearPlaceDetails,
      }
    },
    /**
     * Hook này dùng để sử dụng các actions của PlaceSlice, cụ thể là `currentPlaceDetails`.
     * @returns 
     */
    usePlaceDetailsActions: function() {
      let dispatch = useDispatch();
      
      let {
        addPlaceDetails,
        fetchPlaceDetails,
        clearPlaceDetails,
      } = React.useMemo(() => ({
        addPlaceDetails: createAddPlaceDetailsFn(dispatch),
        fetchPlaceDetails: createFetchPlaceDetailsFn(dispatch),
        clearPlaceDetails: createClearPlaceDetailsFn(dispatch)
      }));

      return {
        addPlaceDetails,
        fetchPlaceDetails,
        clearPlaceDetails,
      }
    },
    /**
     * Hook này dùng để subscribe vào PlaceSlice.
     * @param {string} placeId là `place_id` của một place.
     * @returns {PlaceDataProps}
     */
    usePlaceDetailsState: function(placeId) {
      return useSelector(state => placeDetailsSelector(state, placeId));
    }
  }
})();

/**
 * Hook này dùng để sử dụng API `updateByCaseAPI` để tương tác với Place, API này được dùng trong các actions.
 * Có 2 loại actions là `Toggle` và `Normal`
 * - Toggle: là kiểu tương tác chuyển đổi, khi tương tác kiểu này, thì action ban đầu sẽ được chuyển đổi sang action khác
 * và khi tương tác tiếp thì nó sẽ chuyển đổi về action ban đầu. VD: `yêu thích` và `bỏ yêu thích`.
 * - Normal: là kiểu tương tác bình thường, khi tương tác kiểu này thì action không bị chuyển đổi. VD: `báo cáo địa điểm`.
 * 
 * Các toggle actions như là `yêu thích` hoặc `bỏ yêu thích`, `đánh dấu là đã ghé thăm` hoặc là
 * `bỏ đánh dấu là đã ghé thăm` thì những hành động này là mình đang tương tác với Place để lấy dữ liệu (`place_id`)
 * và lưu nó vào trong dữ liệu của một `user` nào đó. Place này được trực quan hoá bằng Card hoặc xem chi tiết (PlaceDetailScreen).
 * 
 * Tương lai có thể add thêm một số actions khác như là `báo cáo địa điểm`, `xem địa điểm trên bản đồ`.
 * 
 * @param {PlaceDataProps} place Dữ liệu của place.
 * @returns
 * @example
 * ...
 * import { usePlaceInteractionAPI } from 'customHooks/usePlace'
 * 
 * function MyComponent({place, placeIndex}) {
 *   // Ta có likePlace và visitPlace là 2 interact actions
 *   let { extendedPlaceInfo, likePlace, visitPlace } = usePlaceInteractionAPI(place);
 * 
 *   let handleLikeButton = () => likePlace(
 *     // Hàm này sẽ được gọi khi 
 *     (data, state) => updatePlaceDetail(place.place_id, placeIndex, { isLiked: state }),
 *     (state) => updatePlaceDetail(place.place_id, placeIndex, { isLiked: state })
 *   )
 * }
 * ...
 */
export function usePlaceInteractionActions(place) {
  const [extendedPlaceInfo, setExtendedPlaceInfo] = React.useState({
    isLiked: place.isLiked ? true : false,
    isVisited: place.isVisited ? true : false
  });

  /**
   * Hàm này sẽ tạo ra một function dùng để sử dụng Interaction Actions. Interaction Actions là các Actions dùng để
   * sử dụng tính năng tương tác với địa điểm như là thích, ghé thăm hoặc ghi review ngắn về một địa điểm.
   * Thì hàm này dùng để tạo ra các Toggle Interaction Actions, `Toggle Action` là sự tương tác chuyển đổi,
   * chuyển đổi ở đây là chuyển đổi boolean giữa true và false.
   * 
   * Ví dụ có một địa điểm A, và dựa vào kết quả trả về từ server thì người dùng này chưa thích địa điểm A, và
   * cũng chưa ghé thăm, thì khi đó state của `isLiked` và `isVisited` sẽ là `false`. Nếu như ấn like thì state
   * của `isLiked = true` và mình cũng có thể bỏ thích địa điểm này. Đó là lí do vì sao nó được gọi là Toggle Interaction.
   * 
   * Bởi vì dùng API `updateByCaseAPI` và tính chuyển đổi của nó, cho nên là hàm này sẽ nhận vào 2 tham số là
   * `updateCaseWhenActive` và `updateCaseWhenInActive`. Và vì có nhiều Toggle Actions cho nên mình phải nhận thêm
   * thêm một tham số nữa là `toggleInteraction`.
   * 
   * @example
   * // Ví dụ với yêu thích / bỏ yêu thích địa điểm thì mình sẽ có 2 case để update đó là add hoặc remove `place_id`
   * // ra khởi `savedPlaces` của user.
   * 
   * const handleLikeButton = createToggleInteractionAPIFunc("isLiked", UPDATE_USER_CASES["addEle:savedPlaces"], UPDATE_USER_CASES["removeEle:savedPlaces"]);
   * 
   * // Các hàm gọi toggle interaction API này đều nhận vào 2 callback để xử lý khi API gọi thành công hoặc thất bại. Chủ yếu là xử lý dữ liệu.
   * handleLikeButton(
   *   (data, state) => updatePlaceDetail(placeId, placeIndex, updateData),
   *   (state) => updatePlaceDetail(placeId, placeIndex, updateData)
   * )
   */
  const createToggleInteractionActionsFunc = React.useCallback(
    /**
     * @param {"isLiked" | "isVisited"} toggleInteraction
     * @param {string} updateCaseWhenActive 
     * @param {string} updateCaseWhenInActive 
     * @returns 
     */
    (toggleInteraction, updateCaseWhenActive, updateCaseWhenInActive) => {
      /**
       * @param {(data: any, state: boolean) => {}} callWhenAPIResolve Callback gọi khi API resolve
       * @param {(state: boolean) => {}} callWhenAPIReject Callback gọi khi API reject
       */
      return function(callWhenAPIResolve, callWhenAPIReject) {
        setExtendedPlaceInfo(prevState => {
          let state = true;
          let updateCase = updateCaseWhenActive;
          if(prevState[toggleInteraction]) {
            state = false;
            updateCase = updateCaseWhenInActive;
          }
          let data = {
            updateCase: updateCase,
            updateData: place.place_id
          }
          updateUserByCaseAPI(data)
          .then(data => {
            // Update lên store.
            if(callWhenAPIResolve) callWhenAPIResolve(data, state)
          })
          .catch(error => {
            if(callWhenAPIReject) callWhenAPIReject(!state)
            setExtendedPlaceInfo(prevState => ({...prevState, [toggleInteraction]: !state}))
            console.error(error.message)
          })
          return {...prevState, [toggleInteraction]: state}
        })
      }
  }, [])

  /**
   * Hàm này dùng để yêu thích một place, nó sẽ gửi id của place về server và tự server nó sẽ xử lý.
   */
  const { likePlace, visitPlace } = React.useMemo(() => ({
    /**
     * Hàm này dùng để yêu thích/bỏ yêu thích một địa điểm nào đó. Nhận vào hai tham số là
     * `callWhenAPIResolve` và `callWhenAPIReject`
     */
    likePlace: createToggleInteractionActionsFunc("isLiked", UPDATE_USER_CASES["addEle:savedPlaces"], UPDATE_USER_CASES["removeEle:savedPlaces"]),
  }), [])

  React.useEffect(() => {
    // console.log("Isliked from place: ", Boolean(place.isLiked));
    if(Boolean(place.isLiked) !== extendedPlaceInfo.isLiked) {
      setExtendedPlaceInfo(prevState => ({...prevState, isLiked: Boolean(place.isLiked)}))
    }

    if(Boolean(place.isVisited) !== extendedPlaceInfo.isVisited) {
      setExtendedPlaceInfo(prevState => ({...prevState, isVisited: Boolean(place.isVisited)}))
    }
  }, [place.isLiked, place.isVisited]);

  return {
    extendedPlaceInfo,
    likePlace,
    visitPlace
  }
}