import { configureStore } from '@reduxjs/toolkit'
import devToolsEnhancer from 'remote-redux-devtools'
import userSlice from '../redux/user/slice/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  devTools: false,
  enhancers: [devToolsEnhancer({ realtime: true })],
})
export default store
