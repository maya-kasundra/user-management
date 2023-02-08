import { configureStore } from '@reduxjs/toolkit'
import rootRed from '../redux/user/slice/userSlice'

const store = configureStore({
  reducer: rootRed,
})
export default store
