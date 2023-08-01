import { configureStore } from '@reduxjs/toolkit';
import courses from '../slices/coursesSlice/coursesSlice';

const store = configureStore({
  reducer: {
    courses
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;