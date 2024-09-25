import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['user.socketConnection'],
        ignoredActionPaths: ['payload.socketConnection'],
      },
    }),
});
