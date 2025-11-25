import { useLoaderStore } from "@/store/useLoaderStore"
import { ActivityIndicator, Text, View } from "react-native"


export const GlobalLoader = ({loaderText}: {loaderText: string}) => {
    const { loading } = useLoaderStore();

    if(!loading) return;
    return(
        <View className="absolute top-0  h-full  w-full bg-black/60  items-center justify-center gap-2">
            <ActivityIndicator size={'large'}  />
            <Text className="text-xl font-semibold dark:text-white">{loaderText}</Text>
        </View>
    )
}