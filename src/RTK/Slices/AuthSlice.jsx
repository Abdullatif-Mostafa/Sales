import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userInfo) => {
  const { username, email, password } = userInfo;
  console.log(userInfo);
  const response = await fetch('https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      role: "user",
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  // console.log("data reg ",data)
  // console.log("token ",data.token);
  // console.log("token ",data.user.username);
  // console.log("token ",data.user._id);
  
  // Store token and user data in localStorage
  localStorage.setItem('token', data.token);
  localStorage.setItem('username', data.user.username);
  localStorage.setItem('userId', data.user._id);

  return data; // Return the entire data object
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const { email, password } = credentials;

  const response = await fetch('https://sales-aapi-git-main-sales-projects-8932005b.vercel.app/Users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  // Store token and user data in localStorage
  localStorage.setItem('token', data.token);
  localStorage.setItem('username', data.user.username);
  localStorage.setItem('userId', data.user._id);

  return data; // Return the entire data object
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null, // Store user data in state
    loading: false,
    error: null,
    userId: localStorage.getItem('userId') || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      // Optional: Clear cart and favorites for the user
      // localStorage.removeItem(`cart_${state.userId}`);
      // localStorage.removeItem(`favorites_${state.userId}`);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Save user data in state
        state.token = action.payload.token; // Save token in state
        state.userId = action.payload.user._id; // Save userId in state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Save user data in state
        state.token = action.payload.token; // Save token in state
        state.userId = action.payload.user._id; // Save userId in state
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
