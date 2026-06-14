import React from 'react';
import { View, Text } from 'react-native';

export const customToastRenderers = {
  // 1. Sleek Modern Success Card (White theme with Emerald Green border)
  success: (toast) => (
    <View className="w-[91%] flex-row items-center bg-white p-4 my-1 rounded-2xl border-l-[6px] border-emerald-500 shadow-md shadow-black/10">
      <View className="w-9 h-9 rounded-full bg-emerald-50 items-center justify-center mr-3">
        <Text className="text-lg">✨</Text>
      </View>
      <View className="flex-1">
        {toast.title && (
          <Text className="text-[15px] font-bold text-gray-900 mb-0.5" numberOfLines={1}>
            {toast.title}
          </Text>
        )}
        {toast.message && (
          <Text className="text-[13px] text-gray-500 font-medium leading-[18px]" numberOfLines={2}>
            {toast.message}
          </Text>
        )}
      </View>
      <View className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-2 self-start mt-1.5" />
    </View>
  ),

  // 2. Sleek Modern Error Card (Deep Red solid container)
  error: (toast) => (
    <View className="w-[91%] flex-row items-center bg-red-800 p-4 my-1 rounded-2xl shadow-lg shadow-black/10">
      <View className="w-9 h-9 rounded-full bg-red-700/60 items-center justify-center mr-3">
        <Text className="text-lg">🚨</Text>
      </View>
      <View className="flex-1">
        {toast.title && (
          <Text className="text-[15px] font-bold text-white mb-0.5" numberOfLines={1}>
            {toast.title}
          </Text>
        )}
        {toast.message && (
          <Text className="text-[13px] text-red-200 font-medium leading-[18px]" numberOfLines={2}>
            {toast.message}
          </Text>
        )}
      </View>
      <View className="w-1.5 h-1.5 rounded-full bg-red-300 ml-2 self-start mt-1.5" />
    </View>
  ),
};