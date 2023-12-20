import { EditNote } from '../../components/edit-note'
import { useEdit } from '../../hooks/useEdit'

export const Edit = () => {
  const { memoNote, note, onCloseHandler, onSubmitHandler } = useEdit()

  return (
    note && (
      <EditNote
        initial={memoNote}
        onClose={onCloseHandler}
        onSubmitNote={onSubmitHandler}
        open={!!note}
      />
    )
  )
}
