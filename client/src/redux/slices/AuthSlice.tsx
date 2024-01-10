import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
  isLoggedin: boolean;
  role: string | null; // Role would be a string or null initially
}

const initialState: AuthType = {
  isLoggedin: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedin = true;
      state.role = action.payload; // Save the role from the payload
    },
    setLoggedOut: (state) => {
      state.isLoggedin = false;
      state.role = null; // Reset role on logout
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
