import axios from 'axios'
import { auth_local_storage_token } from '../api/api-end-point'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    authorization: 'Bearer ' + `${auth_local_storage_token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
