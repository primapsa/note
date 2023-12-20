import s from './add-note.module.scss'

import { MODE } from '../../const'
import { useAddNote } from '../../hooks/useAddNote'
import { NoteForm } from '../note-form'
import { NoteLabel } from '../note-label'

export const AddNote = () => {
  const { addNoteHandler, isLabel, labelClickHandler, mode } = useAddNote()

  return (
    <div className={s['wrapper']}>
      {mode === MODE.FORM && <NoteForm onSubmitNote={addNoteHandler}></NoteForm>}
      {isLabel && <NoteLabel onLabelClick={labelClickHandler} />}
    </div>
  )
}
