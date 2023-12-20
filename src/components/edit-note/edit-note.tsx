import React, { useCallback } from 'react'

import { Modal } from '@mui/base'

import s from './edit-note.module.scss'

import { AddNoteFormProps, NoteForm } from '../note-form'

export const EditNote = React.memo(({ onClose, open, ...props }: EditNoteType) => {
  const onCloseHandler = useCallback(() => onClose(), [])

  return (
    <Modal className={s['modal']} open={open}>
      <>
        <div className={s['wrapper']}>
          <NoteForm {...props} />
        </div>
        <div className={s['backdrop']} onClick={onCloseHandler}></div>
      </>
    </Modal>
  )
})

type EditNoteType = EditNoteHandlers & Required<AddNoteFormProps>
type EditNoteHandlers = {
  onClose: () => void
  open: boolean
}
