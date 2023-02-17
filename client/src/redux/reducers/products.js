import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../Services/Api";
import { createAction } from 'redux-actions';
import axios from "axios";

export const addProduct = createAction("ADD_PRODUCT");
export const editProduct = createAction("EDIT_PRODUCT");
export const deleteProduct = createAction("DELETE_PRODUCT");

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const URL = 'http://localhost:8080';

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    editProduct: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      state.products[index] = { ...state.products[index], ...updates };
    },
    deleteProduct(state, action) {
      const idToDelete = action.payload;
      state.products = state.products.filter(product => product.id !== idToDelete);
    },
  },
});

export const { getProductsStart, getProductsSuccess, getProductsError } = productsSlice.actions;

export default productsSlice.reducer;

export function fetchProducts(store,params) {
  return async (dispatch) => {
    
      const token = JSON.parse(localStorage.getItem('user'));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      dispatch(getProductsStart());
      axios.get(`${URL}/api/product/ByStore/${store}?${params}`, { headers })
      .then((response) => {
        dispatch(getProductsSuccess(response.data));
        return response.data;
      })
      .catch ((error) => {
        if (error.response && error.response.status === 401) {
          // Si le jeton d'authentification n'est pas valide ou s'il n'est pas présent,
          // déconnectez l'utilisateur et affichez un message d'erreur
          dispatch(logout());
          dispatch(getProductsError('Vous devez vous connecter pour accéder à cette page'));
        } else {
          dispatch(getProductsError(error.message));
        }
      });
  };
}

export async function addNewProduct(product) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${URL}/api/product/add`, product, config);
    addProduct(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function editaProduct(product,id) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${URL}/api/product/${id}`, product, config);
    editProduct(response.data._id,product);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteaProduct(id) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${URL}/api/product/${id}`, config);
    deleteProduct(response.data._id);
  } catch (error) {
    console.error(error);
  }
}