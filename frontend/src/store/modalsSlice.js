import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addNewChannel: {
    show: false,
  },
  removeChannel: {
    show: false,
  },
  renameChannel: {
    show: false,
  },
  currentChannel: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showAddNewChannel: (state) => {
      state.addNewChannel.show = true;
    },
    unshowAddNewChannel: (state) => {
      state.addNewChannel.show = false;
    },
    showRemoveChannel: (state) => {
      state.removeChannel.show = true;
    },
    unshowRemoveChannel: (state) => {
      state.removeChannel.show = false;
    },
    showRenameChannel: (state) => {
      state.renameChannel.show = true;
    },
    unshowRenameChannel: (state) => {
      state.renameChannel.show = false;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload;
    }
  }
});

export const {
  showAddNewChannel,
  unshowAddNewChannel,
  showRemoveChannel,
  unshowRemoveChannel,
  showRenameChannel, 
  unshowRenameChannel,
  setCurrentChannel, 
} = modalsSlice.actions;

export default modalsSlice.reducer;