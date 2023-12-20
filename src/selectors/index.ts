import { createSelector } from '@reduxjs/toolkit'

import { MODE } from '../const'
import { AppRootStateType } from '../store'
import { NoteType } from '../store/note-reducer'

export const getMode = (state: AppRootStateType) => state.app.mode
export const getNotes = (state: AppRootStateType) => state.note.items
export const getEditId = (state: AppRootStateType) => state.note.editId
export const getAllTags = (state: AppRootStateType) => state.filter.tags
export const getFilter = (state: AppRootStateType) => state.filter.filter
export const getEditedNote = createSelector(
  [getMode, getNotes, getEditId],
  (mode, notes, editId): NoteType | null => {
    if (mode === MODE.EDIT && editId) {
      return notes.find(e => e.id === editId) || null
    }

    return null
  }
)

export const getTags = createSelector([getNotes], notes => [
  ...new Set(notes.flatMap(note => note.tags)),
])
