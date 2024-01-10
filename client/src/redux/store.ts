import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './services/Products';
import CartReducer from '../redux/slices/CartSlice'
import authReducer from '../redux/slices/AuthSlice'


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
      cart : CartReducer,
      auth : authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;