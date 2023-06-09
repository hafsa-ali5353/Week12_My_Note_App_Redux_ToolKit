import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './api/noteSlice';
export const store = configureStore({
    // Reducer Pure functions that return a new state based on the old state +the function
  reducer: {
    note: noteReducer
  },
})