import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/user/slice/userSlice'
// import rootRed from '../redux/user/slice/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
  },
})
export default store
