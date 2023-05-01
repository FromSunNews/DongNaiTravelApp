import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateCurrentPlacesState,
  inscreaseSkipBriefPlacesAmountState,
  descreaseSkipBriefPlacesAmountState,
  clearAllBriefPlaces,
  fetchBriefPlacesByTypeAsyncThunk,
  briefPlacesSeletor
} from 'redux/places/PlacesSlice'

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