import React, { useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'
import SeparatorLine from './SeparatorLine'
import { OptimizedListProps } from '@/types/optimizedList';

const OptimizedList  = <T, >({data, renderItem, keyExtractor}: OptimizedListProps<T>) => {
    const memoizedRenderItem  = useCallback(renderItem, [renderItem]);
  return (
    <FlatList
            data={data}
            renderItem={memoizedRenderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            ItemSeparatorComponent={() => <SeparatorLine />}
            ListEmptyComponent={
              <View className="items-center justify-center h-screen">
                <Text className="text-xl dark:text-white/50">No post found!</Text>
              </View>
            }
          />
  )
}

export default OptimizedList