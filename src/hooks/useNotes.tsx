import { useCallback, useEffect } from 'react'

import { Note } from '../components/note'
import { MODE } from '../const'
import { getFilter, getNotes } from '../selectors'
import { useAppDispatch, useAppSelector } from '../store'
import { setAppMode } from '../store/app-reducer'
import { NoteType, deleteNote, fetchNotes, setEditId } from '../store/note-reducer'

export const useNotes = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector<NoteType[]>(getNotes)
  const filter = useAppSelector(getFilter)

  useEffect(() => {
    dispatch(fetchNotes(filter))
  }, [filter])
  const onDeleteHandler = useCallback(
    (id: number) => {
      dispatch(deleteNote(id))
    },
    [dispatch]
  )
  const onEditHandler = useCallback(
    (id: number) => {
      dispatch(setEditId(id))
      dispatch(setAppMode(MODE.EDIT))
    },
    [dispatch]
  )
  const items = notes.map(note => (
    <Note initial={note} key={note.id} onDelete={onDeleteHandler} onEdit={onEditHandler}></Note>
  ))

  return {
    items,
  }
}
