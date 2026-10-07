import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   appointments: [],
   slots: [],
   error: null,
   loading: null,
};

export const createSlot = createAsyncThunk(
   "slots/createSlot",
   async (data, { rejectWithValue }) => {
      try {
         const res = await axios.post("http://localhost:3001/slots", data);

         return res.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const fetchSlots = createAsyncThunk(
   "slots/fetchSlots",
   async (_, { rejectWithValue }) => {
      try {
         const res = await axios.get("http://localhost:3001/slots");

         return res.data;
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const deleteSlot = createAsyncThunk(
   "slots/deleteSlot",
   async (data, { rejectWithValue }) => {
      try {
         const res = await axios.delete(
            `http://localhost:3001/slots/${data.id}`,
         );

         return res.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const appointmentSlice = createSlice({
   name: "appointment",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createSlot.pending, (state) => {
            ((state.pending = true), (state.error = false));
         })
         .addCase(createSlot.fulfilled, (state, action) => {
            ((state.pending = false),
               (state.error = false),
               state.slots.push(action.payload));
         })
         .addCase(createSlot.rejected, (state, action) => {
            ((state.pending = false), (state.error = action.payload));
         })
         .addCase(fetchSlots.pending, (state) => {
            state.pending = true;
            state.error = false;
         })
         .addCase(fetchSlots.fulfilled, (state, action) => {
            ((state.pending = false),
               (state.error = false),
               (state.slots = action.payload));
         })
         .addCase(fetchSlots.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload;
         })
         .addCase(deleteSlot.pending, (state) => {
            state.pending = true;
            state.error = false;
         })
         .addCase(deleteSlot.fulfilled, (state, action) => {
            state.pending = false;
            state.error = false;
            state.slots = state.slots.filter(
               (slot) => slot.id !== action.meta.arg.id,
            );
         })
         .addCase(deleteSlot.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload;
         });
   },
});

export default appointmentSlice.reducer;
