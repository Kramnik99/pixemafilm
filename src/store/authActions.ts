import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://studapi.teachmeskills.by';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: { username: string; email: string; password: string; course_group: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const activateUser = createAsyncThunk(
  'auth/activateUser',
  async ({ uid, token }: { uid: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/users/activation/`, {
        uid,
        token,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Не удалось активировать аккаунт');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const res = await response.json();
      localStorage.setItem('token', res.access);
      return res.access;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/users/me/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Не удалось загрузить профиль');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);