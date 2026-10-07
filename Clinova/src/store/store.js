import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth.slice';
import appointmentReducer from '../features/appointment.slice';

const store = configureStore({
    reducer:{
        user:authReducer,
        appointment:appointmentReducer,
    }
})

export default store;