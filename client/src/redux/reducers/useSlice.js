import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from 'react-hot-toast';

export const userSlice =  createSlice({
    name:"user",
    initialState: {
        user: null,
        loginError: null,
    },
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user.accessToken));
            localStorage.setItem('userID', JSON.stringify(state.user._id));
            localStorage.setItem('userObject', JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            localStorage.clear();
        },
        loginError: (state, action) => {
          state.loginError = action.payload;
        }
    },
});

export const { login, logout ,loginError } = userSlice.actions;
// export const selectUser = (state) => state.user.user;
export default userSlice.reducer;

const URL = 'http://localhost:8080';

export const postLogin = (state) => {
    console.log(state)
      return async (dispatch) => {
          const config = {
              headers: {
                  'Content-Type': 'application/json',
              },
          };
          try {
              const response = await axios.post(`${URL}/api/auth/login/`, state, config);
        // const { accessToken } = response.data;
        // localStorage.setItem('user', accessToken);
  
              dispatch(login(response.data));
              toast.success("You are successfully logged in")
              setTimeout(() => { 
                  window.location.reload();
              }, 800)
          } catch (error) {
              console.log(error.response.data);
              toast.error(error.response.data);
            dispatch(loginError(error.message))
              // dispatch(loginError(error.response.data.non_field_errors[0]))
          }
      };
  };

  export const postLogout = () => {
      return async (dispatch) => {
  
              dispatch(logout());
              toast.success("You are successfully disconected")
              setTimeout(() => { 
                  window.location.reload();
              }, 800)
         
      };
  };
