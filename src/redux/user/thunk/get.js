import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import userService from '../services/user.services'

export const getUser = createAsyncThunk(
  'user/get-user',
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const { data } = await axios.get('https://gorest.co.in/public/v2/users')
      console.log(data)
      return data
      // const response = await userService.get(payload)
      // return response
    } catch (error) {
      rejectWithValue(error.response.data)
      // return thunkAPI.rejectWithValue(error)
    }
  }
)
