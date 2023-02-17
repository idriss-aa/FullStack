import axios from 'axios';
import { login , loginError } from '../redux/reducers/useSlice';
import toast from 'react-hot-toast';
import { createAction } from 'redux-actions';

const URL = 'http://localhost:8080';

// export const postLogin = (state) => {
//   console.log(state)
// 	return async (dispatch) => {
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};
// 		try {
// 			const response = await axios.post(`${URL}/api/auth/login/`, state, config);
//       // const { accessToken } = response.data;
//       // localStorage.setItem('user', accessToken);

// 			dispatch(login(response.data));
// 			toast.success("You are successfully logged in")
// 			setTimeout(() => { 
// 				window.location.reload();
// 			}, 800)
// 		} catch (error) {
// 			console.log(error.response.data);
// 			toast.error(error.response.data);
//       dispatch(loginError(error.message))
//             // dispatch(loginError(error.response.data.non_field_errors[0]))
// 		}
// 	};
// };


export function logout() {
    return async (dispatch) => {
        dispatch(logout());
    }
  }


export async function validateToken(token) {
  try {
      const config = {
          headers: {
              token: `Bearer ${token}`,
          },
      };
      const response = await axios.get(`${URL}/api/auth/validate`, config);
      // console.log()
      return response.status === 200;
  } catch (error) {
      throw error;
  }
}
