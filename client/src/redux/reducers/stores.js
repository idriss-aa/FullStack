import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../Services/Api";
import { createAction } from 'redux-actions';
import axios from "axios";

export const addShop = createAction("ADD_SHOP");
export const editShop = createAction("EDIT_SHOP");
export const deleteShop = createAction("DELETE_SHOP");

const initialState = {
  shops: [],
  loading: false,
  error: null,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    getStoresStart(state) {
      state.loading = true;
      state.error = null;
    },
    getStoresSuccess(state, action) {
      state.loading = false;
      state.shops = action.payload;
    },
    getStoresError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [addShop]: (state, action) => {
      state.shops = [...state.shops, action.payload];
    },
    editShop: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.shops.findIndex(shop => shop.id === id);
      state.shops[index] = { ...state.shops[index], ...updates };
    },
    deleteShop: (state, action) => {
      const idToDelete = action.payload;
      state.shops = state.shops.filter(shop => shop.id !== idToDelete);
    },
  },
});


export const { getStoresStart, getStoresSuccess, getStoresError } = shopsSlice.actions;

export default shopsSlice.reducer;

const URL = 'http://localhost:8080';

export function fetchShops(params) {
  return async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('user'));
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        dispatch(getStoresStart());
        const response = await axios.get(`${URL}/api/store?${params}`, { headers });
        dispatch(getStoresSuccess(response.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
          // Si le jeton d'authentification n'est pas valide ou s'il n'est pas présent,
          // déconnectez l'utilisateur et affichez un message d'erreur
          dispatch(logout());
          dispatch(getStoresError('Vous devez vous connecter pour accéder à cette page'));
        } else {
          dispatch(getStoresError(error.message));
        }
    }
  };
}

export async function addNewStore(store) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    console.log(store);
    const response = await axios.post(`${URL}/api/store/add`, store, config);
    addShop(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function editaStore(store,id) {
  console.log(store,id)
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    console.log(store);
    const response = await axios.put(`${URL}/api/store/edit/${id}`, store, config);
    editShop(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteaStore(id) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${URL}/api/store/${id}`, config);
    deleteShop(response.data._id);
  } catch (error) {
    console.error(error);
  }
}