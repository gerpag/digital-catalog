import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal:modalSlice,
  },
});

export default store;
