import { AxiosInstance } from "axios"
import { Store } from "@reduxjs/toolkit"

export interface APIsOptionsProps {
  axiosInstance: AxiosInstance,
  apiRoot: string,
  endpoint: string,
  routeName: string,
  apiVersion: string,
  reduxStore: () => Store,
  getFullRoute: (hasVersion: boolean) => string,
  getQueryString: (query: {[key: string]: any}) => string
}