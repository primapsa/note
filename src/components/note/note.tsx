import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import s from './note.module.scss'

import { useNote } from '../../hooks/useNote'
import { NoteType } from '../../store/note-reducer'

export const Note = React.memo(({ initial, onDelete, onEdit }: NoteProps) => {
  const { onDeleteHandler, onEditHandler, replacedText, tags } = useNote({
    initial,
    onDelete,
    onEdit,
  })

  return (
    <Box className={s['note']} onClick={onEditHandler}>
      <Box>
        <Typography component={'h6'} variant={'h6'}>
          {initial.title}
        </Typography>
        <div className={s['text']}>{replacedText}</div>
        <Box className={s['delete']} onClick={onDeleteHandler}>
          <DeleteIcon />
        </Box>
        <Box className={s['select']}></Box>
      </Box>
      <Box className={s['tags']}>{tags}</Box>
    </Box>
  )
})

export type NoteProps = {
  initial: NoteType
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}
