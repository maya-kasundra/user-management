import { createSlice } from '@reduxjs/toolkit'
import { deleteUser } from '../thunk/delete'
import { getUser } from '../thunk/get'
import { postUser } from '../thunk/post'
import { putUser } from '../thunk/put'

const initialState = {
  get: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    list: [],
  },
  delete: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  put: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  post: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
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

    // DELETE
    [deleteUser.pending]: (state, action) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.message = action.payload.code
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = action.error
    },
    // PUT
    [putUser.pending]: (state, action) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    [putUser.fulfilled]: (state, action) => {
      state.message = action.payload.code
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
    },
    [putUser.rejected]: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = action.error
    },

    // POST
    [postUser.pending]: (state, action) => {
      state.post.isLoading = true
      state.post.isSuccess = false
      state.post.isError = false
    },
    [postUser.fulfilled]: (state, action) => {
      state.post.message = action.payload.code
      state.post.isLoading = false
      state.post.isSuccess = true
      state.post.isError = false
    },
    [postUser.rejected]: (state, action) => {
      state.post.isLoading = false
      state.post.isSuccess = false
      state.post.isError = true
      state.post.errorMessage = action.error
    },
  },
})

export const {} = userSlice.actions
export default userSlice.reducer
