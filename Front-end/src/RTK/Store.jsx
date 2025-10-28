import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import { usersSlice } from "./Slices/UsersSlice";
import OffersProductSlice from "./Slices/OffersProductSlice";
import productsSlice from './Slices/ProductSlice';
import CartSlice from "./Slices/CartSlice";
import FavoriteProductsSlice from "./Slices/FavoriteProducts-Slice";
const store = configureStore({
  reducer: {
    products:productsSlice,
    cart:CartSlice,
    auth: authReducer,
    users:usersSlice.reducer,
    favoriteProducts:FavoriteProductsSlice,
    offerProducts:OffersProductSlice
  },
 });
export default store;
