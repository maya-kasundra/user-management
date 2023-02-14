import { createAsyncThunk } from '@reduxjs/toolkit'
import userServices from '../services/user.services'

export const deleteUser = createAsyncThunk(
  'user/delete-user',
  async (payload, thunkAPI) => {
    console.log('user/delete-user payload---->', payload)
    try {
      const response = await userServices.delete(payload)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
