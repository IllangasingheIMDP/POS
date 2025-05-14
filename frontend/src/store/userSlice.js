import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../constants/api';
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await api.get('/me', { withCredentials: true });
  return response.data;
});

export const logout = createAsyncThunk('user/logout', async () => {
  await api.post('/auth/logout', {}, { withCredentials: true });
  window.location.href = '/login';
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    role: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.role = action.payload.role;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
        state.role = null;
        state.status = 'idle';
      });
  },
});

export default userSlice.reducer;