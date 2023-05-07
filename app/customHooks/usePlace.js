import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateCurrentPlaceDetailsState,
  inscreaseSkipBriefPlacesAmountState,
  descreaseSkipBriefPlacesAmountState,
  clearAllBriefPlaces,
  fetchBriefPlacesByTypeAsyncThunk,
  briefPlacesSeletor,
  placeDetailsSelector,
  clearPlaceDetailsState
} from 'redux/places/PlacesSlice'

import {
  PlaceDataProps
} from 'types/index.d.ts'

export function useBriefPlaces(typeOfBriefPlaces) {
  let places = useSelector(state => briefPlacesSeletor(state, typeOfBriefPlaces));
  let dispatch = useDispatch();

  let inscreaseSkip = () => dispatch(inscreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));
  let descreaseSkip = () => dispatch(descreaseSkipBriefPlacesAmountState(typeOfBriefPlaces));
  let clearAll = () => dispatch(clearAllBriefPlaces());

  let fetchBriefPlaceByType = fields => dispatch(fetchBriefPlacesByTypeAsyncThunk({type: typeOfBriefPlaces, fields}))

  return {
    places,
    inscreaseSkip,
    descreaseSkip,
    clearAll,
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

  let updatePlaceDetails = placeDetails => dispatch(updateCurrentPlaceDetailsState(placeDetails));
  let clearPlaceDetails = () => dispatch(clearPlaceDetailsState());

  return {
    updatePlaceDetails,
    clearPlaceDetails
  }
}

/**
 * Hook này dùng để subscribe vào PlaceSlice.
 * @returns {PlaceDataProps}
 */
export function usePlaceDetailsState() {
  return useSelector(placeDetailsSelector);
}

/**
 * Hook này dùng để subscribe vào PlaceSlice và dùng các action của nó.
 * @returns 
 */
export function usePlaceDetails() {
  let placeDetails = useSelector(placeDetailsSelector);
  let dispatch = useDispatch();

  let updatePlaceDetails = placeDetails => dispatch(updateCurrentPlaceDetailsState(placeDetails));
  let clearPlaceDetails = () => dispatch(clearPlaceDetailsState());

  return {
    placeDetails,
    updatePlaceDetails,
    clearPlaceDetails
  }
}