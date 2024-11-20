// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index.js";
import reactFlowReducer from "./reactflow/reactFlowSlice.js";
import emailTemplateReducer from "./emailtemp/emailTemplate.js";
import timeReducer from "./time/time.js";
import emailFollowusReducer from './emailFollowup/emailFollowup.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reactFlow: reactFlowReducer,  
    emailList: emailTemplateReducer,  // Renamed emailList to match the earlier provided slice
    time: timeReducer,
    emailFollowus: emailFollowusReducer // Ensure the reducer key matches the slice name
  },
});

export default store;
