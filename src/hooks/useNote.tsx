import React, { useCallback } from 'react'
import reactStringReplace from 'react-string-replace'

import s from '../components/note/note.module.scss'

import { NoteProps } from '../components/note'

export const useNote = ({ initial, onDelete, onEdit }: NoteProps) => {
  const onDeleteHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      onDelete(initial.id)
    },
    [initial]
  )
  const onEditHandler = useCallback(() => onEdit(initial.id), [initial])
  const tags = initial.tags.map(tag => (
    <div className={s['tag']} key={tag}>
      #{tag}
    </div>
  ))
  const replacedText = reactStringReplace(initial.body, /#(\w+)/g, (tag, _) => (
    <span className={s['selected']} key={tag}>
      {tag}
    </span>
  ))

  return {
    initial,
    onDeleteHandler,
    onEditHandler,
    replacedText,
    tags,
  }
}
