import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import Typography from '@mui/material/Typography'

import s from './note-label.module.scss'

export const NoteLabel = ({
  color,
  onVisible,
  ...props
}: NoteLabelProps & Omit<ComponentPropsWithoutRef<'div'>, keyof NoteLabelProps>) => {
  const toggleVisdible = () => onVisible(true)

  return (
    <div className={s['button']} onClick={toggleVisdible} {...props}>
      <Typography color={color} variant="body2">
        Take a note...
      </Typography>
    </div>
  )
}

type NoteLabelProps = {
  color?: CSSProperties['color']
  onVisible: (v: boolean) => void
}
