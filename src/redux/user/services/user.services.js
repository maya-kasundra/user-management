import commonAPI from '../../../api/common'
import { userEndPoint } from '../../../api/api-end-point'

class userService {
  get() {
    return commonAPI.get(`/${userEndPoint}`)
  }

  post() {
    return commonAPI.post(`/${userEndPoint}`)
  }

  //delete using id
  delete(id) {
    return commonAPI.delete(`/${userEndPoint}/${id}`)
  }
}

export default new userService()
