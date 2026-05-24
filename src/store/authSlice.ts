import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchMe, activateUser } from './authActions';

interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: any | null;
  registrationSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.registrationSuccess = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      state.registrationSuccess = false;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.registrationSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(activateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.isAuth = false;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, clearError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;