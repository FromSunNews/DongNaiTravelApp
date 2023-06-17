import {
  AxiosHeaders,
  AxiosRequestHeaders
} from 'axios'

/**
 * Hàm này dùng để tạo data cho body của repuest. Nó sẽ trả về một body có dạng là
 * `multipart/form-data` và một `headers` có 1 thuộc tính là `'Content-Type': 'multipart/form-data'`.
 * @param {any} data 
 * @returns 
 */
const createMultipartFormData = function(data) {
  const formData = new FormData();
  let keys = Object.keys(data);

  for(let key of keys) {
    formData.append(key, data[key])
  }

  return [
    formData,
    /**
     * @type {AxiosRequestHeaders}
     */
    {
      'Content-Type': 'multipart/form-data'
    }
  ];
}

const AxiosUtility = {
  createMultipartFormData
}

export default AxiosUtility;