import { createSlice } from '@reduxjs/toolkit'

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
    addUser: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
