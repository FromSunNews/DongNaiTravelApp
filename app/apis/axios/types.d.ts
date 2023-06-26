import { AxiosInstance, AxiosHeaders, AxiosResponse } from "axios"
import { Store } from "@reduxjs/toolkit"

export interface APIOptionsProps {
  /**
   * Headers cho api. Mặc định là Headers của Axios.
   */
  headers: AxiosHeaders,
  /**
   * Instance của Axios, dùng để gọi api. Mặc định là Instance của Axios.
   */
  axiosInstance: AxiosInstance,
  /**
   * Phương thức của HTTP.
   */
  method: "GET" | "POST" | "POST" | "DELETE" | "PATCH"
}

/**
 * Đây là type cho mỗi một prop trong `callers` của `CreateAPICallersOptions`
 */
export interface CreateAPICallersCaller extends APIOptionsProps {
  /**
   * Path phần thêm vào baseUrl để xây dựng một URL hoàn chỉ. Dùng cho một số api cụ thể.
   */
  path: string,
  /**
   * Dùng để kiểm soát việc gọi api. Nhận vào 2 tham số là data (có thể là query hoặc body) và hàm
   * call (hàm này là hàm gọi api).
   * @param data 
   * @param call 
   * @returns 
   */
  fn: (data: any, call: (data: any) => Promise<AxiosResponse>) => Promise<any>
}

// Cái này dùng để gán Type khi tạo APIs.
declare type CreateAPICallersCallers<CallerOptions> = {
  [Key in keyof CallerOptions]: CreateAPICallersCaller | string;
}

// Cài này dùng để gán Type khi tạo xong và trả về các APIs Caller.
export declare type APICallers<CallerOptions> = {
  [Key in keyof CallerOptions]: (data: any, headers: AxiosHeaders) => Promise<any>
}

export interface CreateAPICallersOptions<CallerOptions> extends APIOptionsProps {
  /**
   * Phần cố định trong URL, nó sẽ là nền tảng để xây dựng các URL hoàn chỉnh.
   */
  baseUrl: string,
  /**
   * Path phần thêm vào baseUrl để xây dựng một URL hoàn chỉ. Dùng chung cho toàn bộ apis.
   */
  path: string,
  /**
   * Setting của các hàm gọi apis. Sẽ được dùng để cài đặt.
   */
  callers: CreateAPICallersCallers<CallerOptions>
}