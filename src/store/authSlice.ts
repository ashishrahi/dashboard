import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utilities/Api';

// Define types for state

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null;
  tokenExpiresAt: string | null;
}

// Define the initial state
const initialState: AuthState = {
  admin: JSON.parse(localStorage.getItem('admin') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle',
  error: null,
  token: localStorage.getItem('token') || null,
  tokenExpiresAt: null,
};

// Async thunk for registration

export const registerAdmin = createAsyncThunk<Admin, Admin, { rejectValue: string }>(
  'auth/registerAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', adminData);
      window.location.replace('/login');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for login
export const loginAdmin = createAsyncThunk<{ admin: Admin; token: string; tokenExpiresAt: string }, Admin, { rejectValue: string }>(
  'auth/loginAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', adminData);
      window.location.replace('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpiresAt = null;
      state.status = 'idle';
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAdmin.fulfilled, (state, action: PayloadAction<Admin>) => {
        state.status = 'succeeded';
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<{ admin: Admin; token: string; tokenExpiresAt: string }>) => {
        state.status = 'succeeded';
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.tokenExpiresAt = action.payload.tokenExpiresAt;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('admin', JSON.stringify(action.payload.admin));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.admin = null;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
