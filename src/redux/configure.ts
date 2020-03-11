import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { usersSlice } from "./reducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  user: usersSlice.reducer,
  loading: loadingReducer
});

const store = configureStore({
  reducer: rootReducer
});

export { store };
