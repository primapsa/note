import { useCallback, useEffect } from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'

import s from '../container/filter/filter.module.scss'

import { getAllTags, getFilter } from '../selectors'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchTags, setFilter } from '../store/filter-reducer'

export const useFilter = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector(getAllTags)
  const filter = useAppSelector(getFilter)

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof filter>) => {
      const {
        target: { value },
      } = event

      dispatch(setFilter(typeof value === 'string' ? value.split(',') : value))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])
  const selected = (selected: string[]) => (
    <Box className={s['chipbox']}>
      {selected.map(value => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )
  const menu = tags.map(name => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  ))

  return { filter, handleChange, menu, selected, tags }
}
