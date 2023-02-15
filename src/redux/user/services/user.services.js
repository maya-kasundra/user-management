import commonAPI from '../../../api/common'
import { userEndPoint } from '../../../api/api-end-point'

class userService {
  get() {
    return commonAPI.get(`/${userEndPoint}`)
  }
  //create user
  post(data) {
    return commonAPI.post(`/${userEndPoint}`, data)
  }

  //delete using id
  delete(id) {
    return commonAPI.delete(`/${userEndPoint}/${id}`)
  }

  // put/ edit using Id
  put(id, data) {
    return commonAPI.put(`/${userEndPoint}/${id}`, data)
  }
}

export default new userService()
