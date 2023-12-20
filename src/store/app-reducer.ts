import { Dispatch, createSlice } from '@reduxjs/toolkit'

import { MODE, STATUS } from '../const'

const initialState: AppStateType = {
  mode: MODE.LABEL,
  status: STATUS.LOADING,
}

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setAppMode(state, action: ActionType<ModeType>) {
      state.mode = action.payload
    },
    setAppStatus(state, action: ActionType<AppStatus>) {
      state.status = action.payload
    },
  },
})

export const { setAppMode, setAppStatus } = appSlice.actions
export default appSlice.reducer

export type AppStateType = {
  mode: ModeType
  status: AppStatus
}

export type AppStatus = 'error' | 'idle' | 'loading' | 'offline' | 'success'
export type ModeType = 'edit' | 'form' | 'label'

export type ActionType<T> = {
  payload: T
}

export type AppNotificationType = {
  message: string
  status: AppStatus
}
export type PopupType = {
  message: string
  title: string
}

export type AsyncThunkConfig = {
  dispatch?: Dispatch
  extra?: unknown
  fulfilledMeta?: unknown
  pendingMeta?: unknown
  rejectValue?: unknown
  rejectedMeta?: unknown
  serializedErrorType?: unknown
  state?: unknown
}
