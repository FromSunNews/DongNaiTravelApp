/**
 * Hàm này dùng để tạo data cho body của repuest. Nó sẽ trả về một body có dạng là
 * `multipart/form-data` và một `headers` có 1 thuộc tính là `'Content-Type': 'multipart/form-data'`.
 * @param {any} data 
 * @returns 
 */
const createMultipartFormData = function(data) {
  const jsonString = JSON.stringify(data);
  const formData = new FormData();
  formData.append('data', new Blob([jsonString], {type: 'application/json'}));
  return { formData, headers: { 'Content-Type': 'multipart/form-data' }};
}

const AxiosUtility = {
  createMultipartFormData
}

export default AxiosUtility;