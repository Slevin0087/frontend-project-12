import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  defaultChannel: "general",
  activeChannel: null,
  modifiedChannel: null,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addOneChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    addChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    removeChannel: (state, action) => {
      console.log("в removeChannel, action.payload: ", action.payload);
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      console.log("в removeChannel, state.channels: ", state.channels);
    },
    renameChannel: (state, action) => {      
      const newChannels = state.channels.map((channel) => {
        if (channel.id === action.payload.id) return channel = action.payload;
        return channel;
      });
      state.channels = newChannels;
    },
    setModifiedChannel: (state, action) => {
      state.modifiedChannel = action.payload;
    },
  },
});

export const {
  addOneChannel,
  addChannels,
  setActiveChannel,
  removeChannel,
  renameChannel,
  setModifiedChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
