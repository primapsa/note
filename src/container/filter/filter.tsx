import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'

import s from './filter.module.scss'

import { useFilter } from '../../hooks/useFilter'

export const Filter = () => {
  const { filter, handleChange, menu, selected, tags } = useFilter()

  return (
    <Box>
      <FormControl className={s['filter']}>
        <InputLabel id="chip">Filter</InputLabel>
        <Select
          disabled={!tags.length}
          id="chip"
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          labelId="demo-multiple-chip-label"
          multiple
          onChange={handleChange}
          renderValue={selected}
          value={filter}
        >
          {menu}
        </Select>
      </FormControl>
    </Box>
  )
}
