import React from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import {
  addPlaceDetailsState,
  inscreaseSkipBriefPlacesAmountState,
  descreaseSkipBriefPlacesAmountState,
  updateBriefPlaceState,
  clearAllBriefPlaces,
  fetchBriefPlacesByTypeAsyncThunk,
  fetchPlaceDetailsByIdAsyncThunk,
  briefPlacesSeletor,
  placeDetailsSelector,
  clearPlaceDetailsState
} from 'redux/places/PlacesSlice'

import {
  PlaceDataProps,
  PlaceDetailsDataProps
} from 'types/index.d.ts'

export function useBriefPlaces(typeOfBriefPlaces) {
  let places = useSelector(state => briefPlacesSeletor(state, typeOfBriefPlaces));
  let dispatch = useDispatch();
  /**
   * Dispatch action này để tăng skip cho một briefPlaces nào đó.
   * @returns 
   */
  let inscreaseSkip = () => dispatch(inscreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));
  /**
   * Dispatch action này để giảm skip cho một briefPlaces nào đó.
   * @returns 
   */
  let descreaseSkip = () => dispatch(descreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));
  /**
   * Dispatch action này để clear data của một briefPlaces
   * @returns 
   */
  let clearAll = () => dispatch(clearAllBriefPlaces());
  /**
   * Dispatch action này để update một briefPlace trong briefPlaces nào đó.
   * @returns 
   */
  let updateBriefPlace = (placeId, placeIndex, updateData) => dispatch(updateBriefPlaceState({placeId, placeIndex, typeOfBriefPlaces, updateData}))

  /**
   * Dispatch action này để lấy dữ liệu của briefPlaces từ server.
   * @returns 
   */
  let fetchBriefPlaceByType = fields => dispatch(fetchBriefPlacesByTypeAsyncThunk({type: typeOfBriefPlaces, fields}))

  return {
    places,
    inscreaseSkip,
    descreaseSkip,
    clearAll,
    updateBriefPlace,
    fetchBriefPlaceByType
  }
}

export function useBriefPlacesActions(typeOfBriefPlaces) {
  let dispatch = useDispatch();

  /**
   * Dispatch action này để tăng skip cho một briefPlaces nào đó.
   * @returns 
   */
  let inscreaseSkip = () => dispatch(inscreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));
  /**
   * Dispatch action này để giảm skip cho một briefPlaces nào đó.
   * @returns 
   */
  let descreaseSkip = () => dispatch(descreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));
  /**
   * Dispatch action này để clear data của một briefPlaces
   * @returns 
   */
  let clearAll = () => dispatch(clearAllBriefPlaces());
  /**
   * Dispatch action này để update một briefPlace trong briefPlaces nào đó.
   * @returns 
   */
  let updateBriefPlace = (placeId, placeIndex, updateData) => dispatch(updateBriefPlaceState({placeId, placeIndex, typeOfBriefPlaces, updateData}))

  /**
   * Dispatch action này để lấy dữ liệu của briefPlaces từ server.
   * @returns 
   */
  let fetchBriefPlaceByType = fields => dispatch(fetchBriefPlacesByTypeAsyncThunk({type: typeOfBriefPlaces, fields}))

  return {
    inscreaseSkip,
    descreaseSkip,
    clearAll,
    updateBriefPlace,
    fetchBriefPlaceByType
  }
}

/*
  usePlaceDetails được chia ra làm 2 hook nhỏ hơn là: usePlaceDetailsActions và usePlaceDetailsState.
  Bời vì sẽ có những component không cần dùng state mà dùng action để update state, thì nó sẽ gây việc
  re-render không mong muốn. Ví dụ có 2 component A và B:
  - Nếu như theo như các thông thường, thì A sẽ update state thì B sẽ được render lại, tuy nhiên A cũng sẽ
  render lại.
  - Nếu như chia hook ra làm hai, thì khi A update state thì B sẽ được render lại, nhưng A sẽ không.
*/

/**
 * Hook này dùng để sử dụng các actions của PlaceSlice, cụ thể là `currentPlaceDetails`.
 * @returns 
 */
export function usePlaceDetailsActions() {
  let dispatch = useDispatch();

  /**
   * Hàm này dùng để thêm một place details vào trong store.
   * @param {PlaceDetailsDataProps} placeDetails Dữ liệu của một place, không nhất thiết phải có `content` hay `reviews`.
   * @returns 
   */
  let addPlaceDetails = placeDetails => dispatch(addPlaceDetailsState(placeDetails));
  /**
   * Hàm này dùng để lấy dữ liệu chi tiết của một place trên server theo `place_id` và `lang`.
   * @param {string} placeId là `place_id` của một place.
   * @param {string} lang ngôn ngữ mong muốn của dữ liệu trả về (với các trường có hỗ trợ nhiều ngôn ngữ).
   * @returns 
   */
  let fetchPlaceDetails = (placeId, lang) => dispatch(fetchPlaceDetailsByIdAsyncThunk({placeId, lang}));
  /**
   * Hàm này dùng để clear details của một place nào đo theo `place_id`. 
   * @param {string} placeId là `place_id` của một place.
   * @returns 
   */
  let clearPlaceDetails = placeId => dispatch(clearPlaceDetailsState(placeId));

  return {
    addPlaceDetails,
    fetchPlaceDetails,
    clearPlaceDetails
  }
}

/**
 * Hook này dùng để subscribe vào PlaceSlice.
 * @param {string} placeId là `place_id` của một place.
 * @returns {PlaceDataProps}
 */
export function usePlaceDetailsState(placeId) {
  return useSelector(state => placeDetailsSelector(state, placeId));
}

/**
 * Hook này dùng để subscribe vào PlaceSlice và dùng các action của nó.
 * @param {string} placeId là `place_id` của một place.
 * @returns 
 */
export function usePlaceDetails(placeId) {
  let placeDetails = useSelector(state => placeDetailsSelector(state, placeId));
  let dispatch = useDispatch();

  /**
   * Hàm này dùng để thêm một place details vào trong store.
   * @param {PlaceDetailsDataProps} placeDetails Dữ liệu của một place, không nhất thiết phải có `content` hay `reviews`.
   * @returns 
   */
  let addPlaceDetails = placeDetails => dispatch(addPlaceDetailsState(placeDetails));
  /**
   * Hàm này dùng để lấy dữ liệu chi tiết của một place trên server theo `place_id` và `lang`.
   * @param {string} lang ngôn ngữ mong muốn của dữ liệu trả về (với các trường có hỗ trợ nhiều ngôn ngữ).
   * @returns 
   */
  let fetchPlaceDetails = (placeId, lang) => dispatch(fetchPlaceDetailsByIdAsyncThunk({placeId, lang}));
  /**
   * Hàm này dùng để clear details của một place nào đo theo `place_id`. 
   * @returns 
   */
  let clearPlaceDetails = placeId => dispatch(clearPlaceDetailsState(placeId));

  return {
    placeDetails,
    addPlaceDetails,
    fetchPlaceDetails,
    clearPlaceDetails
  }
}