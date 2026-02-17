import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import { useBookingStore } from '@/stores/booking.store'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const userToken = useAuthStore.getState().token
  const guestToken = useBookingStore.getState().guestToken

  // Priority: User Token > Guest Token
  const token = userToken || guestToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response Interceptor: Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If it was a user token, logout
      if (useAuthStore.getState().token) {
        useAuthStore.getState().logout()
      }
      // If guest token expired, we might want to clear it too
      // but usually guest tokens are short-lived anyway.
    }
    return Promise.reject(error)
  }
)
