import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import appReducer from './app-reducer'
import filterReducer from './filter-reducer'
import noteReducer from './note-reducer'

export const rootReducer = combineReducers({
  app: appReducer,
  filter: filterReducer,
  note: noteReducer,
})

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
