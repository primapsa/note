import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { notesAPI } from '../api'
import { STATUS } from '../const'
import { setTags } from '../store/filter-reducer'
import { ActionType, AppStatus } from './app-reducer'

const initialState: NoteStateType = {
  editId: null,
  items: [],
  status: STATUS.IDLE,
}

export const addNote = createAsyncThunk('note/add', async (note: NoteType, thunkAPI) => {
  try {
    const response = await notesAPI.add(note)

    thunkAPI.dispatch(setTags(response.tags))

    return response.notes
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const editNote = createAsyncThunk('note/edit', async (note: NoteType, thunkAPI) => {
  try {
    const response = await notesAPI.update(note)

    thunkAPI.dispatch(setTags(response.tags))

    return response.notes
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteNote = createAsyncThunk('note/delete', async (id: number, thunkAPI) => {
  try {
    const response = await notesAPI.delete(id)

    thunkAPI.dispatch(setTags(response.tags))

    return response.id
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const fetchNotes = createAsyncThunk(
  'note/fetch',
  async (filter: string[], { rejectWithValue }) => {
    try {
      return await notesAPI.getAll(filter)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const noteSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(addNote.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items.push(payload as NoteType)
        }
        state.status = STATUS.IDLE
      })
      .addCase(addNote.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        if (Number.isInteger(payload)) {
          state.items = state.items.filter(e => e.id !== payload)
        }
      })
      .addCase(fetchNotes.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items = [...payload]
        }
      })
      .addCase(editNote.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items = state.items.map(e => (e.id === payload.id ? { ...payload } : e))
        }
      })
  },
  initialState,
  name: 'note',
  reducers: {
    setEditId(state, action: ActionType<number>) {
      state.editId = action.payload
    },
  },
})
export const { setEditId } = noteSlice.actions
export default noteSlice.reducer

export type NoteStateType = {
  editId: null | number
  items: NoteType[]
  status: AppStatus
}

export type NoteType = {
  body: string
  id: number
  tags: string[]
  title: string
}
