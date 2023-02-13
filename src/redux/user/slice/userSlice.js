import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../thunk/get'

const initialState = {
  get: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    list: [],
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: [],
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.get.isLoading = true
      state.get.isSuccess = false
      state.get.isError = false
    },
    [getUser.fulfilled]: (state, action) => {
      state.get.list = action.payload.data
      state.get.isLoading = false
      state.get.isSuccess = true
      state.get.isError = false
    },
    [getUser.rejected]: (state, action) => {
      state.get.isLoading = false
      state.get.isSuccess = false
      state.get.isError = true
      state.get.errorMessage = action.error
    },
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
