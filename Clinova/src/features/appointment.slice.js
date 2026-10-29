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
   async (id, { rejectWithValue }) => {
      try {
         const res = await axios.get(
            `http://localhost:3001/slots?doc_id=${id}`,
         );

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

export const changeAvailability = createAsyncThunk(
   "slots/changeAvailability",
   async ({ slotID, available }, { rejectWithValue }) => {
      try {
         let res = await axios.patch(`http://localhost:3001/slots/${slotID}`, {
            available,
         });

         return res.data;
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const createAppointment = createAsyncThunk(
   "appointments/createAppointment",
   async (data, { rejectWithValue }) => {
      try {
         let res = await axios.post("http://localhost:3001/appointments", data);
         return res.data;
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
      }
   },
);

export const fetchAppointment = createAsyncThunk(
   "appointment/fetchAppointment",
   async (id, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/appointments/?patientID=${id}`,
         );

         return res.data;
      } catch (error) {
         return rejectWithValue("Error:- ", error.message);
      }
   },
);

export const fetchAppointmentDoc = createAsyncThunk(
   "appointment/fetchAppointmentDoc",
   async (id, { rejectWithValue }) => {
      try {
         let res = await axios.get(
            `http://localhost:3001/appointments/?doctorID=${id}`,
         );

         return res.data;
      } catch (error) {
         return rejectWithValue("Error:- ", error.message);
      }
   },
);

export const changeStatus = createAsyncThunk(
   "appointments/changeStatus",
   async ({ appointmentID, status }, { rejectWithValue }) => {
      try {
         let res = await axios.patch(
            `http://localhost:3001/appointments/${appointmentID}`,
            {
               status,
            },
         );

         return res.data;
      } catch (error) {
         return rejectWithValue("Error: " + error.message);
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
         })
         .addCase(createAppointment.pending, (state) => {
            state.pending = true;
            state.error = false;
         })
         .addCase(createAppointment.fulfilled, (state, action) => {
            state.pending = false;
            state.error = false;
            state.appointments.push(action.payload);
         })
         .addCase(createAppointment.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload;
         })
         .addCase(changeAvailability.pending, (state) => {
            state.loading = true;
            state.error = false;
         })
         .addCase(changeAvailability.fulfilled, (state, action) => {
            const updatedSlot = action.payload;

            state.loading = false;
            state.error = false;
            state.slots = state.slots.map((slot) =>
               slot.id === updatedSlot.id ? updatedSlot : slot,
            );
         })
         .addCase(changeAvailability.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(fetchAppointment.pending, (state) => {
            state.loading = true;
            state.error = false;
         })
         .addCase(fetchAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.appointments = action.payload;
         })
         .addCase(fetchAppointment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(fetchAppointmentDoc.pending, (state) => {
            state.loading = true;
            state.error = false;
         })
         .addCase(fetchAppointmentDoc.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.appointments = action.payload;
         })
         .addCase(fetchAppointmentDoc.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(changeStatus.pending, (state) => {
            state.loading = true;
            state.error = false;
         })
         .addCase(changeStatus.fulfilled, (state, action) => {
            const updatedAppointment = action.payload;

            state.loading = false;
            state.error = false;
            state.appointments = state.appointments.map((appointment) =>
               appointment.id === updatedAppointment.id
                  ? updatedAppointment
                  : appointment,
            );
         })
         .addCase(changeStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export default appointmentSlice.reducer;
