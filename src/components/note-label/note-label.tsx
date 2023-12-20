import React, { CSSProperties, ComponentPropsWithoutRef } from 'react'

import Typography from '@mui/material/Typography'

import s from './note-label.module.scss'

export const NoteLabel = React.memo(
  ({
    color,
    onLabelClick,
    ...props
  }: NoteLabelProps & Omit<ComponentPropsWithoutRef<'div'>, keyof NoteLabelProps>) => {
    return (
      <div className={s['button']} onClick={onLabelClick} {...props}>
        <Typography color={color} variant="body2">
          Take a note...
        </Typography>
      </div>
    )
  }
)

type NoteLabelProps = {
  color?: CSSProperties['color']
  onLabelClick: () => void
}
