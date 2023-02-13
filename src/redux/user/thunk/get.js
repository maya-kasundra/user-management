import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/user.services'

export const getUser = createAsyncThunk(
  'get-user',
  async (payload, thunkAPI) => {
    try {
      const response = await userService.get(payload)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
