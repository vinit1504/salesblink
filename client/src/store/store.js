// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index.js";
import reactFlowReducer from "./reactflow/reactFlowSlice.js";
import emailTemplateReducer from "./emailtemp/emailTemplate.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reactFlow: reactFlowReducer,
    emailList : emailTemplateReducer // Ensure the reducer key matches the slice name
  },
});

export default store;
