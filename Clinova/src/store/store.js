import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth.slice';

const store = configureStore({
    reducer:{
        user:authReducer
    }
})

export default store;