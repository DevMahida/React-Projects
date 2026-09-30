import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   doctors: [],
   loading: "",
   error: "",
};

export const fetchDoctors = createAsyncThunk(
   "doctors/fetchDoctors",
   async (_, { rejectWithValue }) => {
      try {
         const response = await axios.get("http://localhost:3001/doctors");

         return response.data;
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const loginDoctor = createAsyncThunk(
   "doctor/loginDoctor",
   async (Data, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/doctors?email=${encodeURIComponent(Data.email)}`,
         );

         if (res.data.length == 0) {
            alert(`Doctor data doesn't Exist ! Check Email or Password`);
            return rejectWithValue("Doctor data not exist !");
         }

         if (Data.password != res.data[0].password) {
            alert("Password doesn't match !");
            return rejectWithValue("Password doesn't match!");
         }

         return res.data[0];
      } catch (error) {
         return rejectWithValue("Error: ", error);
      }
   },
);

const doctorSlice = createSlice({
   name: "doctors",
   initialState,
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
         .addCase(loginDoctor.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(loginDoctor.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload;
            state.users = null;
         })
         .addCase(loginDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.errorMsg = null;
            state.users = action.payload;
         });
   },
});

// this will go to store
export default doctorSlice.reducer;
