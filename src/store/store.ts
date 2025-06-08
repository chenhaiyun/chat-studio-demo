import { configureStore } from '@reduxjs/toolkit';
import helpPanelReducer from './slices/helpPanelSlice';
export const store = configureStore({
  reducer: {
    helpPanel: helpPanelReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
