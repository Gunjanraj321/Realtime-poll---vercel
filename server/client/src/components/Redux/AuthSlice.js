import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem("token") ? true : false,
    isToken: localStorage.getItem("token") || null ,
    isEmail: localStorage.getItem("email") || null ,
    isUserId: localStorage.getItem("userId") || null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.isToken = action.payload;
      localStorage.setItem("token",action.payload);
    },
    setEmail:(state,action)=>{
        state.isEmail=action.payload;
        localStorage.setItem("email",action.payload);
    },
    setUserId:(state, action)=>{
      state.isUserId = action.payload;
      localStorage.setItem("userId",action.payload);
    }

    ,
    clearAuthState: (state) => {
      state.isAuth = false;
      state.isToken = null; 
      state.isEmail = null;
      state.isUserId = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setAuthenticated, setToken, clearAuthState, setEmail ,setUserId } = AuthSlice.actions;
export default AuthSlice.reducer;
