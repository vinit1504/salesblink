// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index.js";
import reactFlowReducer from "./reactflow/reactFlowSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reactFlow: reactFlowReducer, // Ensure the reducer key matches the slice name
  },
});

export default store;
