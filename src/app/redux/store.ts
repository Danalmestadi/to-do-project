import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slice/taskSlice';

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
