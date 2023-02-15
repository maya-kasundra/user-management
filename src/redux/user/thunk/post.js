import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from './get'
import userServices from '../services/user.services'

export const postUser = createAsyncThunk(
  'user/post-user',
  async (payload, thunkAPI) => {
    console.log('post-payload-payload --->', payload)
    console.log('post-payload-thunkapi--->', thunkAPI)
    try {
      const response = await userServices.post(payload)
      console.log('post-user-response', response)
      thunkAPI.dispatch(getUser())
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
