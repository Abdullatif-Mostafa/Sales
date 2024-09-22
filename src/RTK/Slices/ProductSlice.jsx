// ProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Products');
  const data = await response.json();
  console.log("data ", data.data);
  return data.data; // Assuming the API response is { data: [...] }
});
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Store the products here
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Store the products in `items` field
        // console.log("state ", state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default productsSlice.reducer;
