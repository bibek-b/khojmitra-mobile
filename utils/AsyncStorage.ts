import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log("Error setting item:", error);
    }
}

export const getItem = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null
    } catch (error) {
        console.log("Error getting item: ", error);
    }
}

export const removeItem = async (key: string) => {
    try {
       await AsyncStorage.removeItem(key); 
    } catch (error) {
        console.log("Error removing item: ", error)
    }
}

export const clear = async ( key: string) => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log("Error clearing storage: ", error)
    }
}