import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { reducers } from './reducers';

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDisPatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
