import { useCallback, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { NoteType } from '../store/note-reducer'

export const useNoteForm = ({ initial, onSubmitNote }: AddNoteFormProps) => {
  const initialValue = initial ? initial : {}
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<NoteType>({ defaultValues: initialValue })
  const textareaRef = useRef<HTMLInputElement | null>(null)
  const onSubmit: SubmitHandler<NoteType> = useCallback(
    note => {
      onSubmitNote(note)
      reset()
    },
    [onSubmitNote, reset]
  )

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  return {
    errors,
    handleSubmit,
    onSubmit,
    register,
    textareaRef,
  }
}

export type AddNoteFormProps = {
  initial?: NoteType | null
  onSubmitNote: (v: NoteType) => void
}
