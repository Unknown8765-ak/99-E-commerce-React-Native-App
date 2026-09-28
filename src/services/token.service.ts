import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "99_access_token";

export const tokenService = {
  async saveAccessToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },

  async getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async removeAccessToken(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },
};

// import { Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const ACCESS_TOKEN_KEY = "99_access_token";

// export const tokenService = {
//   async saveAccessToken(token: string): Promise<void> {
//     if (Platform.OS === "web") {
//       localStorage.setItem(ACCESS_TOKEN_KEY, token);
//       return;
//     }

//     await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
//   },

//   async getAccessToken(): Promise<string | null> {
//     if (Platform.OS === "web") {
//       return localStorage.getItem(ACCESS_TOKEN_KEY);
//     }

//     return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
//   },

//   async removeAccessToken(): Promise<void> {
//     if (Platform.OS === "web") {
//       localStorage.removeItem(ACCESS_TOKEN_KEY);
//       return;
//     }

//     await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
//   },
// };