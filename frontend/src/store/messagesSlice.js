import { createSlice } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsSlice.js";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.messages = action.payload;
    },
    addOneMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const { id } = action.payload;
      const restMessages = state.messages.filter(
        (message) => message.channelId !== id
      );
      state.messages = restMessages;
    });
  },
});

export const { addMessages, addOneMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
