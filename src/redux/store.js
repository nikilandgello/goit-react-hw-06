import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";
import { modalReducer } from "./modalSlice";
import { additionalInfoReducer } from "./additionalInfoSlice";

const persistConfig = {
  key: "contacts",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(persistConfig, contactReducer),
    filter: filterReducer,
    modal: modalReducer,
    additionalInfo: additionalInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
