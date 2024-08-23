import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import webinarReducer from './features/webinarInfoSlice';

export const store = configureStore({
  reducer: {
    webinars: webinarReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
