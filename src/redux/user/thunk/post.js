import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from './get'
import userServices from '../services/user.services'

export const postUser = createAsyncThunk(
  'user/post-user',
  async (payload, thunkAPI) => {
    console.log('post-payload--->', payload)
    console.log('post-payload--->', thunkAPI)
    try {
      const response = await userServices.post(payload)
      thunkAPI.dispatch(getUser())
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
