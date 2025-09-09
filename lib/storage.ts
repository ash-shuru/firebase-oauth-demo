export interface AppStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export interface SecureStorage extends AppStorage {
  encryptionKey?: string;
};

export enum StorageKeys {
  ID_TOKEN = 'id_token',
  LOGIN = 'login',
}


export const setSecureItem = async (storage: SecureStorage, key: StorageKeys, value: string) => {
  try {
    await storage.setItem(key, value);
  } catch (error) {
    console.log('Error storing secure item', error);
  }
};

export const getSecureItem = async (storage: SecureStorage, key: StorageKeys) => {
  try {
    return await storage.getItem(key);
  } catch (error) {
    console.log('Error fetching secure item', error);
  }
};

export const removeSecureItem = async (storage: SecureStorage, key: StorageKeys) => {
  try {
    return await storage.removeItem(key);
  } catch (error) {
    console.log('Does not exist', error);
  }
}