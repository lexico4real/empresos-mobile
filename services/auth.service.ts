import api from '@/lib/api';
import { SignInData } from '@/lib/declarations';
import * as SecureStore from 'expo-secure-store';

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() { }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }

  getToken(): string | null {
    return this.token;
  }

  async signIn(data: SignInData) {
    const response = await api.post('/users/sign-in', data);
    if (response.data?.accessToken) {
      this.setToken(response.data.accessToken);
      await SecureStore.setItemAsync('accessToken', response.data.accessToken);
    }
    return response;
  }

  async signOut() {
    this.setToken(null);
    await SecureStore.deleteItemAsync('accessToken');
  }

  async loadToken() {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      this.setToken(token);
    }
    return token;
  }
}

export const authService = AuthService.getInstance(); 