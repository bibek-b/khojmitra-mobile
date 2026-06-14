import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { ToastType } from '@/types/toastConfig';
export const customToastRenderers = {
  success: (toast: ToastType) => (
    <View
      style={{ backgroundColor: '#10b981' }} // green-800
      className="w-[90%] flex-row items-center p-4 my-1 rounded-2xl gap-2"
    >
       <Ionicons
          name="checkmark-done-circle-outline"
          size={24}
          color="white"
        />
        <Text className="text-[15px] font-medium text-white mb-0.5 line-clamp-2">
          {toast.message}
        </Text>
    </View>
  ),

  danger: (toast: ToastType) => (
    <View
      style={{ backgroundColor: '#991b1b' }} // red-800
      className="w-[90%] flex-row items-center p-4 my-1 rounded-2xl gap-2"
    >
       <MaterialIcons name="error-outline" size={24} color="white" />
        <Text className="text-[15px] font-medium text-white mb-0.5 line-clamp-2">
          {toast.message}
        </Text>
    </View>
  ),
};
