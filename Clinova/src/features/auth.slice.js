import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const savedUser = localStorage.getItem("currentUser");

const initialState = {
   currentUser: savedUser ? JSON.parse(savedUser) : null,
   doctors: [],
   loading: false,
   error: null,
   errorMsg: "",
};

export const fetchDoctors = createAsyncThunk(
   "doctors/fetchDoctors",
   async (_, { rejectWithValue }) => {
      try {
         const response = await axios.get(
            "http://localhost:3001/users?role=doctor",
         );

         return response.data;
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const createUser = createAsyncThunk(
   "user/createUser",
   async (userData, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/users?email=${encodeURIComponent(userData.email)}`,
         );

         if (res.data.length == 0) {
            const response = await axios.post(
               "http://localhost:3001/users",
               userData,
            );

            return response.data;
         }
         return rejectWithValue("Email is connected with another account!");
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const loginUser = createAsyncThunk(
   "users/loginUser",
   async (userData, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/users?email=${encodeURIComponent(userData.email)}`,
         );

         if (res.data.length == 0) {
            alert(`Patient data doesn't Exist ! Check Email or Password`);
            return rejectWithValue("Patient data not exist !");
         }

         if (userData.password != res.data[0].password) {
            alert("Password doesn't match !");
            return rejectWithValue("Password doesn't match!");
         }

         return res.data[0];
      } catch (error) {
         return rejectWithValue("Error: ", error.message);
      }
   },
);

const authSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      logoutUser: (state, action) => {
         state.currentUser = null;
         localStorage.removeItem("currentUser");
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchDoctors.pending, (state) => {
            state.loading = true;
            state.error = "";
         })
         .addCase(fetchDoctors.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.doctors = action.payload;
         })
         .addCase(fetchDoctors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = false;
         })
         .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
         })
         .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload;
         })
         .addCase(loginUser.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload;
            state.currentUser = null;

            localStorage.removeItem("currentUser");
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.errorMsg = null;
            state.currentUser = action.payload;

            localStorage.setItem("currentUser", JSON.stringify(action.payload));
         });
   },
});

// this will go to frontend
export const { logoutUser } = authSlice.actions;

// this will go to store
export default authSlice.reducer;
