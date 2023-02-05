import axios from 'axios'
import authorizedAxiosInstance from 'axios/authorizedAxiosInstance'
import { updateNotif } from 'redux/manifold/ManifoldSlice'

import { API_ROOT } from 'utilities/constants'

let store
export const injectStoreRequest = _store => {
  store = _store
}

const handleNotif = (content) => {
  store.dispatch(updateNotif({
    appearNotificationBottomSheet: true,
    contentNotificationBottomSheet: content
  }))
}


export const signUpUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_up`, data)
  handleNotif('Account created successfully!')
  return request.data
}

export const signInUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_in`, data)
  handleNotif('Sign in successfully!')
  return request.data
}

export const refreshTokenAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`, {
    refreshToken: store.getState().user.currentUser?.refreshToken
  })
  return request.data
}
