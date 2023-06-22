import { AxiosInstance } from "axios"
import { Store } from "@reduxjs/toolkit"

export interface APIsOptionsProps {
  axiosInstance: AxiosInstance,
  reduxStore: Store,
  apiRoot: string,
  endpoint: string,
  routeName: string,
  apiVersion: string,
  getFullRoute: (hasVersion: boolean) => string,
  getQueryString: (query: {[key: string]: any}) => string
}