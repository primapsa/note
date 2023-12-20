import { useCallback } from 'react'

import { MODE } from '../const'
import { getMode } from '../selectors'
import { useAppDispatch, useAppSelector } from '../store'
import { ModeType, setAppMode } from '../store/app-reducer'
import { NoteType, addNote } from '../store/note-reducer'

export const useAddNote = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector<ModeType>(getMode)
  const isLabel = mode !== MODE.FORM
  const labelClickHandler = useCallback(() => dispatch(setAppMode(MODE.FORM)), [dispatch])
  const addNoteHandler = useCallback(
    (note: NoteType) => {
      if (note.title || note.body) {
        dispatch(addNote(note))
      }
      dispatch(setAppMode(MODE.LABEL))
    },
    [dispatch]
  )

  return {
    addNoteHandler,
    isLabel,
    labelClickHandler,
    mode,
  }
}
