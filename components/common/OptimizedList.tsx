import React, { useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'
import SeparatorLine from './SeparatorLine'
import { OptimizedListProps } from '@/types/optimizedList';

const OptimizedList  = <T, >({data, renderItem, keyExtractor, parent}: OptimizedListProps<T>) => {
    const memoizedRenderItem  = useCallback(renderItem, [renderItem]);
    const isPostList = parent === "postList";
  return (
   <>
   {isPostList && <SeparatorLine />}
    <FlatList
            data={data}
            renderItem={memoizedRenderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            ItemSeparatorComponent={() => isPostList && <SeparatorLine />}
            ListEmptyComponent={
              <View className="items-center justify-center h-screen">
                <Text className="text-xl dark:text-white/50">No data found!</Text>
              </View>
            }
          />
   </>
  )
}

export default OptimizedList