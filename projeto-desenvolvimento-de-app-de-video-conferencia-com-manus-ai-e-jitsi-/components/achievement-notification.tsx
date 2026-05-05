import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { getTierColor } from "@/shared/achievements";
import { useColors } from "@/hooks/use-colors";

interface AchievementNotificationProps {
  icon: string;
  name: string;
  description: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  xpReward: number;
  onDismiss?: () => void;
  duration?: number;
}

export function AchievementNotification({
  icon,
  name,
  description,
  tier,
  xpReward,
  onDismiss,
  duration = 5000,
}: AchievementNotificationProps) {
  const colors = useColors();
  const slideAnim = useRef(new Animated.Value(400)).current;
  const tierColor = getTierColor(tier);

  useEffect(() => {
    // Animar entrada
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-dismiss após duration
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onDismiss?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [slideAnim, duration, onDismiss]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Pressable
        onPress={() => {
          Animated.timing(slideAnim, {
            toValue: 400,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onDismiss?.();
          });
        }}
      >
        <View
          className="m-4 p-4 rounded-xl flex-row gap-3 items-center shadow-lg"
          style={{
            backgroundColor: colors.surface,
            borderLeftWidth: 4,
            borderLeftColor: tierColor,
          }}
        >
          <Text className="text-4xl">{icon}</Text>
          <View className="flex-1 gap-1">
            <Text className="font-bold text-foreground">{name}</Text>
            <Text className="text-xs text-muted">{description}</Text>
            {xpReward > 0 && (
              <Text className="text-xs font-semibold text-primary">+{xpReward} XP</Text>
            )}
          </View>
          <Text className="text-2xl">✨</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Hook para gerenciar notificações de conquistas
export function useAchievementNotifications() {
  const [notifications, setNotifications] = React.useState<any[]>([]);

  const showNotification = (achievement: any) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { ...achievement, id }]);
  };

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    showNotification,
    dismissNotification,
  };
}


