import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "@/redux/sagas";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import themeReducer from "@/redux/slices/themeSlice";
import languageReducer from "@/redux/slices/languageSlice";
import authReducer from "@/redux/slices/authSlice";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "lang", "auth"],
};

const reducers = combineReducers({
  theme: themeReducer,
  lang: languageReducer,
  auth: authReducer,
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
