import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { listenerMiddleware } from './hooks/redux'

import lessonReducer from '../features/lessons/LessonsSlice'

const rootReducer = combineReducers({ lessons: lessonReducer })

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['lessons.data'],
        ignoredActions: [
          'lessons/create/fulfilled',
          'lessons/list/fulfilled',
          'lessons/retrieve/fulfilled',
          'lessons/update/fulfilled',
          'lessons/delete/fulfilled'
        ],
      },
    }).concat(listenerMiddleware.middleware)    
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
