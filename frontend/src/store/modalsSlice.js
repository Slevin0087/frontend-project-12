import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalComponent: {
    show: false,
    title: '',
    modalBodyType: null,
  },
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModalComponent: (state, action) => {
      state.modalComponent.show = true
      state.modalComponent.title = action.payload.title
      state.modalComponent.modalBodyType = action.payload.modalBodyType
    },
    unshowModalComponent: (state) => {
      state.modalComponent.show = false
      state.modalComponent.title = ''
      state.modalComponent.modalBodyType = null
    },
  },
})

export const {
  showModalComponent,
  unshowModalComponent,
} = modalsSlice.actions

export default modalsSlice.reducer
