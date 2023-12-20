import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { MODE } from '../const'
import { getEditedNote } from '../selectors'
import { useAppDispatch } from '../store'
import { setAppMode } from '../store/app-reducer'
import { NoteType, editNote } from '../store/note-reducer'

export const useEdit = () => {
  const note = useSelector(getEditedNote)
  const dispatch = useAppDispatch()
  const onCloseHandler = useCallback(() => {
    dispatch(setAppMode(MODE.LABEL))
  }, [dispatch])

  const onSubmitHandler = useCallback(
    (edited: NoteType) => {
      if (note) {
        edited.id = note.id
        dispatch(editNote(edited))
      }
      onCloseHandler()
    },
    [dispatch, note]
  )
  const memoNote = useMemo(() => note, [note])

  return { memoNote, note, onCloseHandler, onSubmitHandler }
}
