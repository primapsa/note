import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { notesAPI } from '../api'
import { ActionType } from './app-reducer'

const initialState: FilterStateType = {
  filter: [],
  tags: [],
}

export const fetchTags = createAsyncThunk('filter/fetch', async (_, thunkAPI) => {
  try {
    return await notesAPI.getAllTags()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const filterSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchTags.fulfilled, (state, { payload }) => {
      if (payload) {
        state.tags = payload
      }
    })
  },
  initialState,
  name: 'filter',
  reducers: {
    setFilter(state, action: ActionType<string[]>) {
      state.filter = action.payload
    },

    setTags(state, action: ActionType<string[]>) {
      state.tags = action.payload
    },
  },
})
export const { setFilter, setTags } = filterSlice.actions
export default filterSlice.reducer

export type FilterStateType = {
  filter: string[]
  tags: string[]
}
