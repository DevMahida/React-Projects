import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   users: null,
   loading: "",
   error: "",
   errorMsg: "",
};

export const createPatient = createAsyncThunk(
   "patients/createPatient",
   async (patientData, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/patients?Uemail=${encodeURIComponent(patientData.Uemail)}`,
         );

         if (res.data.length == 0) {
            const response = await axios.post(
               "http://localhost:3001/patients",
               patientData,
            );

            return response.data;
         }
         return rejectWithValue("Email is connected with another account!");
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const loginPatient = createAsyncThunk(
   "patient/loginPatient",
   async (patientData, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/patients?Uemail=${encodeURIComponent(patientData.email)}`,
         );

         if (res.data.length == 0) {
            alert(`Patient data doesn't Exist ! Check Email or Password`);
            return rejectWithValue("Patient data not exist !");
         }

         if (patientData.password != res.data[0].password) {
            alert("Password doesn't match !");
            return rejectWithValue("Password doesn't match!");
         }

         return res.data[0];
      } catch (error) {
         return rejectWithValue("Error: ", error);
      }
   },
);

const patientSlice = createSlice({
   name: "patients",
   initialState,
   reducers: {
      logoutPatient: (state, action) => {
         state.users = null;
         return state;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createPatient.pending, (state) => {
            state.loading = true;
            state.error = "";
         })
         .addCase(createPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.users.push(action.payload);
         })
         .addCase(createPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload;
         })
         .addCase(loginPatient.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(loginPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload;
            state.users = null;
         })
         .addCase(loginPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.errorMsg = null;
            state.users = action.payload;
         });
   },
});

// this will go to frontend
// export const { userAdd } = patientSlice.actions;

// this will go to store
export default patientSlice.reducer;
