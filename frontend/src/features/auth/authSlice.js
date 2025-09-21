
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';


export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/signin', payload);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Network error' });
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/signup', payload);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Network error' });
    }
  }
);


const initialToken = localStorage.getItem('token');
const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: initialToken, user: initialUser, loading: false, error: null },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCredits(state, action) {
      if (state.user) state.user.credits = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.user.id,
          username: action.payload.user.username,
          email: action.payload.user.email,
          credits: action.payload.user.credits
        };
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Sign in failed';
      })

   
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.user.id,
          username: action.payload.user.username,
          email: action.payload.user.email,
          credits: action.payload.user.credits
        };
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Sign up failed';
      });
  }
});

export const { logout, setCredits } = authSlice.actions;
export default authSlice.reducer;
