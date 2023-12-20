import Box from '@mui/material/Box'

import s from './app.module.scss'

import { AddNote } from './components/addnote'
import { Header } from './components/header'
import { Edit } from './container/edit'
import { Filter } from './container/filter'
import { Notes } from './container/notes'
export const App = () => {
  return (
    <Box className={s['container']}>
      <Header />
      <Box className={s['manage']}>
        <AddNote />
        <Filter />
      </Box>
      <Notes />
      <Edit />
    </Box>
  )
}
