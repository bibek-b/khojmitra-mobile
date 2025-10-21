import { NotificationContext } from "@/context/NotificationContext";
import { useContext, useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export default function PopupNotification() {
  const { notification } = useContext(NotificationContext);
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bg =
    notification?.type === "success"
      ? "bg-green-500"
      : notification?.type === "error" && "bg-red-500";

  const isVisible = notification?.visible;

  const closePopup = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (!isVisible) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    const timer = setTimeout(() => {
      closePopup();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className={`${bg} p-5 z-50 gap-4 absolute top-11  rounded-[10px] shadow elevation-md  w-full min-h-[50px]  justify-center`}
    >
      <Text className="capitalize text-white text-xl font-bold text-left">
        {notification?.type}
      </Text>
      <Text className="text-white text-lg ">{notification?.message}</Text>

      <TouchableOpacity className="font-bold " onPress={() => closePopup()}>
        <Text className="text-white font-bold text-right ">Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
