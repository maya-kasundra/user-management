import { createAsyncThunk } from '@reduxjs/toolkit'
import userServices from '../services/user.services'
// import { getUser } from './get'

export const deleteUser = createAsyncThunk(
  'user/delete-user',
  async (payload, thunkAPI) => {
    console.log('user/delete-user payload---->', payload)
    try {
      const response = await userServices.delete(payload)
      // thunkAPI.dispatch(getUser())
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
