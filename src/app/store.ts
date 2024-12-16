import { configureStore } from '@reduxjs/toolkit';
import { cooperationSlice } from './cooperationSlice';

export const store = configureStore({
  reducer: {
    cooperation: cooperationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;