import { createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'
import userServices from '../services/user.services'
// import userService from '../services/user.services'

export const getUser = createAsyncThunk(
  'user/get-user',
  async (payload, thunkAPI) => {
    console.log(payload)
    console.log(thunkAPI)
    try {
      const response = await userServices.get(payload)
      console.log(response.data)
      return response
      // const response = await userService.get(payload)
      // return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
      // return thunkAPI.rejectWithValue(error)
    }
  }
)
