// import { createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { createAsyncThunk } from '@reduxjs/toolkit'


// const initialState = {
//     tokenIsValid: false
// };

// const tokenSlice = createSlice({
//     name: 'token',
//     initialState,
//     reducers: {
//         setTokenIsValid: (state, action) => {
//             state.tokenIsValid = action.payload;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(validateTokenThunk.fulfilled, (state, action) => {
//             state.tokenIsValid = action.payload;
//         })
//     }
// });

// export const { setTokenIsValid } = tokenSlice.actions;

// export default tokenSlice.reducer;

// const URL = 'http://localhost:8080';


// export const validateTokenThunk = createAsyncThunk('token/validate', async (token) => {
//     const isValid = await validateToken(token)
//     return isValid;
// });

// export async function validateToken(token) {
//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//         const response = await axios.get(`${URL}/api/auth/validate`, config);
//         return response.data.valid;
//     } catch (error) {
//         throw error;
//     }
// }