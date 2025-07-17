import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  return !!(await getToken());
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error clearing token:", error);
  }
};
