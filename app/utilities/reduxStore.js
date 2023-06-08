import { updateLoading, updateNotif } from 'redux/manifold/ManifoldSlice'
/**
 * Các ultilities trong này đều dùng với mục đích là sử dụng action của redux
 * bên ngoài các React Component.
 */
export let injectedStore

/**
 * Hàm này dùng để inject Redux store vào trong `injectedStore`.
 * @param _store Instance của redux store. Được sử dụng cho bên ngoài của 
 * @returns 
 */
export function injectStore(_store) {
  if(injectedStore) {
    console.warn('Store has been injected before!');
    return false;
  }
  injectedStore = _store;
  return true;
}

function toggleLoading(state) {
  injectedStore.dispatch(updateLoading(state))
}

/**
 * Hàm này dùng để hiển thị loading trong App, với điều kiện là có hỗ trợ loading,
 * và đã inject store từ trước.
 * @param {() => Promise<any>} callBackAPI 
 * @returns 
 * 
 * @example
 * ```js
 * import { getPlacesAPI } from 'request_api'
 * import { callWithGlobalLoading } from 'utilities/reduxStore'
 * 
 * // Hàm này nhận 1 async function làm thông số.
 * // Có một vài cách dùng sau
 * 
 * // Cách đầu tiên
 * callWithGlobalLoading(async () => {
 *   // Phải có return ở đây (vì nó là một promise) thì mới có thể hiển thị loading được
 *   // Nếu như không return promise thì có nghĩa là `callWithGlobalLoading` sẽ không chờ
 *   // `getPlacesAPI` resolve xong dữ liệu
 *   return getPlacesAPI()
 *   .then(data => {...})
 *   .catch(console.error)
 * })
 * 
 * // Cách thứ 2, cũng na ná với cách dùng của async thunk của Redux nên không có gì để nói.
 * // (2) Và dùng nó ở đây.
 * let data = await callWithGlobalLoading(async () => {
 *   let data = await getPlacesAPI();
 *   // (1) Mình có thể return `data` lấy được khi resolve `getPlacesAPI`
 *   return data;
 * })
 * ```
 */
export async function callWithGlobalLoading(callBackAPI) {
  try {
    if(!injectedStore) throw new Error('You must inject store first!');
    console.log('Loading turn on');
    toggleLoading(true);
    return await callBackAPI();
  } catch (error) {
    console.warn(`[ERROR] callWithLoading: ${error.message}`);
    return Promise.reject(undefined);
  } finally {
    console.log('Loading turn off');
    toggleLoading(false);
  }
}