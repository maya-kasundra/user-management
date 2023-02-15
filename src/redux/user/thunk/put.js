import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from './get'
import userServices from '../services/user.services'

export const putUser = createAsyncThunk(
  'put-company-leave',
  async (payload, thunkAPI) => {
    try {
      const response = await userServices.put(payload.id, payload.data)

      thunkAPI.dispatch(getUser())
      //   History.push('/leave')
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
