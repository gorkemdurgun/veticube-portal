import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "@/redux/sagas";
import appointmentReducer from "@/redux/slices/appointment/appointmentSlice";
import authReducer from "@/redux/slices/auth/authSlice";
import clinicReducer from "@/redux/slices/clinic/clinicSlice";
import languageReducer from "@/redux/slices/language/languageSlice";
import themeReducer from "@/redux/slices/theme/themeSlice";
import userReducer from "@/redux/slices/user/userSlice";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "lang", "auth", "user"],
};

const reducers = combineReducers({
  theme: themeReducer,
  lang: languageReducer,
  auth: authReducer,
  user: userReducer,
  clinic: clinicReducer,
  appointment: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
