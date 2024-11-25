import { useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk, createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '../store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()

declare type ExtraArgument = {foo: string};
export const listenerMiddleware = createListenerMiddleware()
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch,
  ExtraArgument
>()

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()
