import { NotificationContext } from "@/context/NotificationContext";
import { useContext, useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export default function PopupNotification() {
  const { notification, hideNotification } = useContext(NotificationContext);
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bg =
    notification?.type === "success"
      ? "bg-green-500"
      : notification?.type === "error"
        ? "bg-red-500"
        : "bg-yellow-500";

  const closePopupWithAnim = (hideNotifi? : () => void) => {
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
    ]).start(() => {
      hideNotifi?.()
    });
  };

  useEffect(() => {

    fadeAnim.setValue(0);
    slideAnim.setValue(-80);
    scaleAnim.setValue(0.8);

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
      closePopupWithAnim();
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className={`${bg} p-2 z-50  absolute top-8 left-3  rounded-[10px] shadow elevation-md  w-[95%] min-h-[50px]  justify-center`}
    >
      <Text className="capitalize text-white text-xl font-bold text-left">
        {notification?.type} Info
      </Text>
      <Text className="text-white text-lg" numberOfLines={1}>
        {notification?.message} Possible match found for you post UFC gloves
      </Text>

      <TouchableOpacity
        className="font-bold "
         onPress={() => closePopupWithAnim(hideNotification)}
      >
        <Text className="text-white font-bold text-right ">Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
