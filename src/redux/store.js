import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import userSlice from '../redux/user/slice/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
  },
})
export default store
