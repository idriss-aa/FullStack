import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./reducers/useSlice";
import shopsReducer from "./reducers/stores";
import productsReducer from "./reducers/products";
import categoriesReducer from "./reducers/categories";

export default configureStore({
  reducer: {
    user: useReducer,
    shops: shopsReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});