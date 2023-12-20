import React from 'react'

import { Button, TextField } from '@mui/material'

import s from './note-form.module.scss'

import { TEXTAREA } from '../../const'
import { useNoteForm } from '../../hooks/useNoteForm'
import { NoteType } from '../../store/note-reducer'

export const NoteForm = React.memo(({ initial, onSubmitNote }: AddNoteFormProps) => {
  const { errors, handleSubmit, onSubmit, register, textareaRef } = useNoteForm({
    initial,
    onSubmitNote,
  })

  return (
    <div className={s['wrapper']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('title')}
          className={s['test']}
          error={!!errors.title}
          fullWidth
          label="Title"
          margin="dense"
        />
        <TextField
          {...register('body')}
          className={s['test']}
          error={!!errors.body}
          fullWidth
          inputRef={textareaRef}
          label="Take a note"
          margin="normal"
          multiline={true}
          rows={TEXTAREA.SIZE}
        />
        <Button color="primary" type="submit" variant="contained">
          Close
        </Button>
      </form>
    </div>
  )
})

export type AddNoteFormProps = {
  initial?: NoteType | null
  onSubmitNote: (v: NoteType) => void
}
