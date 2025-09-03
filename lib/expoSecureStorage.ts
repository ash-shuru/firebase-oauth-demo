import * as SecureStore from 'expo-secure-store';

import {SecureStorage} from "./storage";

export const expoSecureStorage: SecureStorage = {
  async getItem(key) {
    return SecureStore.getItem(key);
  },
  async setItem(key, value) {
    return SecureStore.setItem(key, value);
  },
  async removeItem(key) {
    return SecureStore.deleteItemAsync(key);
  }
}; 
