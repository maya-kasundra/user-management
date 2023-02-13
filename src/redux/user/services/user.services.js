import commonAPI from '../../../api/common'
import { userAdminEndPoint, userEndPoint } from '../../../api/api-end-point'
class userService {
  get() {
    if (userAdmin()) {
      return commonAPI.get(`/${userAdminEndPoint}`)
    } else {
      return commonAPI.get(`/${userEndPoint}`)
    }
  }
}

export default new userService()
