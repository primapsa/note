import Box from '@mui/material/Box'

import s from './notes.module.scss'

import { useNotes } from '../../hooks/useNotes'

export const Notes = () => {
  const { items } = useNotes()

  return <Box className={s['container']}>{items}</Box>
}
