import { jwtDecode } from 'jwt-decode'

export const decodeToken = <T>(token: string): T | null => {
  try {
    return jwtDecode(token) as T
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
