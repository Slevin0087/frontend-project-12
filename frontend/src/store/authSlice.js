import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { namesLS } from "./constans";
// import { chatApi } from "../routes";
import axios from "axios";

const loginUser = createAsyncThunk("users/loginUser", async (data) => {
  const { values, api } = data
  const response = await axios.post(api, values);
  return response.data;
});

const initialState = {
  username: localStorage.getItem(namesLS.username) || "",
  token: localStorage.getItem(namesLS.token) || null,
  loginStatus: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogIn: (state, action) => {
      console.log("action: ", action);
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      state.loginStatus = true;
      localStorage.setItem(namesLS.token, token);
      localStorage.setItem(namesLS.username, username);
    },
    userLogOut: (state) => {
      state.username = "";
      state.token = null;
      state.loginStatus = false;
      localStorage.removeItem(namesLS.token);
      localStorage.removeItem(namesLS.username);
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("loginUser.pending");

        state.loginStatus = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("loginUser.fulfilled");

        console.log("action: ", action);
        const { username, token } = action.payload;
        localStorage.setItem(namesLS.token, token);
        localStorage.setItem(namesLS.username, username);
        state.username = username;
        state.token = token;
        state.loginStatus = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("loginUser.rejected");

        state.loginStatus = false;
        state.error = action.error;
      });
  },
});

export const { userLogIn, userLogOut, setLoginStatus } = authSlice.actions;
export { loginUser };
export default authSlice.reducer;
