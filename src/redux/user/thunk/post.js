import { createAsyncThunk } from '@reduxjs/toolkit'
import userServices from '../services/user.services'

export const postUser = createAsyncThunk(
  'user/post-user',
  async (payload, thunkAPI) => {
    try {
      const response = await userServices.post(payload)
    } catch {}
  }
)
