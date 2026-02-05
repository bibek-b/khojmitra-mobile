import { PopupNotificationContext } from "@/context/PopupNotificationContext";
import { getPopupNotificationIcon } from "@/utils/getIconName";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export default function PopupNotification() {
  const { popupNotification, hidePopupNotification } = useContext(
    PopupNotificationContext,
  );
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bg =
    popupNotification?.type === "success"
      ? "bg-green-500"
      : popupNotification?.type === "error"
        ? "bg-red-500"
        : "bg-yellow-500";

  const closePopupWithAnim = (hideNotifi?: () => void) => {
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
      hideNotifi?.();
    });
  };

  useEffect(() => {
    if (!popupNotification) return;

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
  }, [popupNotification]);

  const notificationIconName = getPopupNotificationIcon(
    popupNotification?.type!,
  );

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className={`${bg} p-4 z-50 absolute top-8 left-3 rounded-2xl shadow-lg elevation-md w-[95%] min-h-[50px] border border-white/20`}
    >
      {/* Header with icon and type */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          {/* Add an icon based on type - you'd need to import your icon library */}
          <Ionicons name={notificationIconName} size={24} color="white" />
          <Text className="capitalize text-white text-xl font-bold">
            {popupNotification?.type}
          </Text>
        </View>

        {/* Close button as X icon */}
        <TouchableOpacity
          className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
          onPress={() => closePopupWithAnim(hidePopupNotification)}
        >
          <Text className="text-white font-bold text-lg">×</Text>
        </TouchableOpacity>
      </View>

      {/* Message */}
      <Text
        className="text-white/90 text-base leading-5 mb-1"
        numberOfLines={2}
      >
        {popupNotification?.message}
      </Text>

      {/* Progress bar or accent line */}
      <View className="h-1 bg-white/30 rounded-full mt-3 overflow-hidden">
        <View
          className="h-full bg-white/80 rounded-full"
          style={{ width: "100%" }}
        />
      </View>
    </Animated.View>
  );
}
