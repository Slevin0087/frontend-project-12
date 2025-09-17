import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice.js";
import channelsReducer from "../store/channelsSlice.js";
import messageReducer from "../store/messagesSlice.js";
import modalsReducer from "../store/modalsSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messageReducer,
    modals: modalsReducer,
  },
})
