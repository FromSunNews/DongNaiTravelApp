
// Phuong: Created on 31/1/2023
// Phuong: Muon test api thi xem ipv4 trong may tinh => cmd => ipconfig => ipv4
// Phuong: doi lai ipv4 cua minh
const ip_v4 = {
  tuan: '192.168.0.29'
}
const API_PORT = '7500'

// Phuong: This is the api web for DongNaiAppTravel
// export const API_ROOT = 'https://dong-nai-travel-api.onrender.com'
let useLocalServer = true;
export const API_ROOT = useLocalServer ? `http://${ip_v4.tuan}:${API_PORT}` : 'https://dong-nai-travel-api.onrender.com';

export const FilterConstants = {
  categories: {
    ALL_CATEGORIES: 'all_categories',
  },
  sortBy: [
    {
      id: 'DEFAULT',
      tilte: 'Default',
    },
    {
      id: 'PROMINENCE',
      tilte: 'Prominence'
    },
    {
      id: 'NEAR_BY',
      tilte: 'Near by'
    },
    {
      id: 'STAR_LOW_TO_HIGH',
      tilte: 'Star: Low to high'
    },
    {
      id: 'STAR_HIGH_TO_LOW',
      tilte: 'Star: High to low'
    },
    {
      id: 'RATING_LOW_TO_HIGH',
      tilte: 'Rating total: Low to high'
    },
    {
      id: 'RATING_HIGH_TO_LOW',
      tilte: 'Rating total: High to low'
    }
  ],
  priceLevels: {
    LEVEL_1: 'LEVEL_1',
    LEVEL_2: 'LEVEL_2',
    LEVEL_3: 'LEVEL_3',
    LEVEL_4: 'LEVEL_4',
    LEVEL_5: 'LEVEL_5'
  }
}
export const HEADER_HEIGHT = 50;
export const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const BRIEF_PLACE_DATA_FIELDS = "place_id;name;adr_address;types;rating;user_ratings_total;isRecommended;numberOfVisited;formatted_address"
export const PLACE_DETAILS_DATA_FIELDS = "rating;user_ratings_total;numberOfVisited;content;reviews"

export const UPDATE_USER_CASES = {
  'default': 'default',
  'addEle:savedPlaces': 'addEle:savedPlaces',
  'removeEle:savedPlaces': 'removeEle:savedPlaces',
  'addEle:follower': 'addEle:follower',
  'removeEle:follower': 'removeEle:follower'
}

export const USER_ROLES = {
  GUEST: 'GUEST',
  MEMBER: 'MEMBER'
}