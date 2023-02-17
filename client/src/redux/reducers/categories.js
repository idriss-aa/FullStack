import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../Services/Api";
import axios from "axios";
import { createAction } from 'redux-actions';

export const addCategorie = createAction("ADD_CATEGORIE");
export const editCategorie = createAction("EDIT_CATEGORIE");
export const deleteCategorie = createAction("DELETE_CATEGORIE");

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const URL = 'http://localhost:8080';

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    getCategoriesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    [addCategorie]: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    editCategorie: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.categories.findIndex(categorie => categorie.id === id);
      state.categories[index] = { ...state.categories[index], ...updates };
    },
    deleteCategorie(state, action) {
      const idToDelete = action.payload;
      state.categories = state.categories.filter(categorie => categorie.id !== idToDelete);
    },
  },
});

export const { getCategoriesStart, getCategoriesSuccess, getCategoriesError } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export function fetchCategories(store,param) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      dispatch(getCategoriesStart());
      const response = await axios.get(`${URL}/api/categorie/ByStore/${store}?${param}`, { headers });
      dispatch(getCategoriesSuccess(response.data));
    } catch (error) {
      if (error.response.status === 404) {
      }
      else if (error.response && error.response.status === 401) {
        // Si le jeton d'authentification n'est pas valide ou s'il n'est pas présent,
        // déconnectez l'utilisateur et affichez un message d'erreur
        dispatch(logout());
        dispatch(getCategoriesError('Vous devez vous connecter pour accéder à cette page'));
      } 
      else {
        dispatch(getCategoriesError(error.message));
      }
    }
  };
}

export async function addNewCategorie(categorie) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${URL}/api/categorie/add`, categorie, config);
    addCategorie(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function editaCategorie(categorie,id) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${URL}/api/categorie/${id}`, categorie, config);
    editCategorie(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteaCategorie(id) {
  try {
    const token = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${URL}/api/categorie/${id}`, config);
    deleteCategorie(response.data);
  } catch (error) {
    console.error(error);
  }
}