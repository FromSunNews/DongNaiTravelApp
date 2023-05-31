import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  ASYNC_STORAGE_CONSTANT_KEYS
} from 'utilities/constants'

/**
 * Hàm này dùng để lấy dữ liệu ở trong `AsyncStorage` theo `key`.
 * @param {keyof typeof ASYNC_STORAGE_CONSTANT_KEYS} key 
 * @returns {Promise<any | undefined>}
 */
const getItemAsync = async function(key) {
  try {
    let constantKey = ASYNC_STORAGE_CONSTANT_KEYS[key];
    if(!constantKey) throw new Error(`The key ${key} is not support in async storage constant key.`);
    let value = await AsyncStorage.getItem(constantKey);
    let data = JSON.parse(value);
    return data;
  } catch (error) {
    let message = error.message ? ": " + error.message : "";
    console.error("AsyncStorage Get Item Error", message);
    return undefined;
  }
}

/**
 * Hàm này dùng để lưu `data` vào trong `AsyncStorage` theo `key`.
 * @param {keyof typeof ASYNC_STORAGE_CONSTANT_KEYS} key 
 * @param {any} data 
 * @returns 
 */
const setItemAsync = async function(key, data) {
  try {
    let constantKey = ASYNC_STORAGE_CONSTANT_KEYS[key];
    if(!constantKey) throw new Error(`The key ${key} is not support in async storage constant key.`);
    await AsyncStorage.setItem(constantKey, JSON.stringify(data));
    return true;
  } catch (error) {
    let message = error.message ? ": " + error.message : "";
    console.error("AsyncStorage Set Item Error", message);
    return false;
  }
}

/**
 * Hàm này dùng để xoá dữ liệu ở trong `AsyncStorage` theo `key`.
 * @param {keyof typeof ASYNC_STORAGE_CONSTANT_KEYS} key 
 * @returns 
 */
const removeItemAsync = async function(key) {
  try {
    let constantKey = ASYNC_STORAGE_CONSTANT_KEYS[key];
    if(!constantKey) throw new Error(`The key ${key} is not support in async storage constant key.`);
    await AsyncStorage.removeItem(constantKey);
    return true;
  } catch (error) {
    let message = error.message ? ": " + error.message : "";
    console.error("AsyncStorage Remove Item Error", message);
    return false;
  }
}

const AsyncStorageUtility = {
  getItemAsync,
  setItemAsync,
  removeItemAsync
}

export default AsyncStorageUtility;