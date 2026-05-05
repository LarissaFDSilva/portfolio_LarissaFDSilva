import { View, Text, Pressable } from "react-native";
import { getTierColor, getTierBackgroundColor, AchievementTier } from "@/shared/achievements";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  icon: string;
  name: string;
  tier: AchievementTier;
  isUnlocked: boolean;
  onPress?: () => void;
}

export function AchievementBadge({
  icon,
  name,
  tier,
  isUnlocked,
  onPress,
}: AchievementBadgeProps) {
  const tierColor = getTierColor(tier);
  const tierBgColor = getTierBackgroundColor(tier);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        className={cn(
          "items-center gap-2 p-3 rounded-xl",
          isUnlocked ? "bg-surface" : "bg-muted/20",
        )}
        style={{
          borderWidth: 2,
          borderColor: isUnlocked ? tierColor : "#ccc",
          backgroundColor: isUnlocked ? tierBgColor : "#f5f5f5",
        }}
      >
        <Text
          className="text-3xl"
          style={{
            opacity: isUnlocked ? 1 : 0.4,
          }}
        >
          {icon}
        </Text>
        <Text
          className={cn(
            "text-xs font-semibold text-center",
            isUnlocked ? "text-foreground" : "text-muted",
          )}
          numberOfLines={2}
        >
          {name}
        </Text>
        {isUnlocked && (
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: tierColor,
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

interface AchievementProgressProps {
  currentProgress: number;
  targetProgress: number;
  isUnlocked: boolean;
}

export function AchievementProgress({
  currentProgress,
  targetProgress,
  isUnlocked,
}: AchievementProgressProps) {
  const percentage = Math.min((currentProgress / targetProgress) * 100, 100);

  return (
    <View className="gap-1">
      <View className="h-2 bg-muted/20 rounded-full overflow-hidden">
        <View
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: isUnlocked ? "#22C55E" : "#0a7ea4",
          }}
        />
      </View>
      <Text className="text-xs text-muted">
        {currentProgress} / {targetProgress}
      </Text>
    </View>
  );
}

interface AchievementCardProps {
  icon: string;
  name: string;
  description: string;
  tier: AchievementTier;
  isUnlocked: boolean;
  currentProgress?: number;
  targetProgress?: number;
  unlockedDate?: Date;
}

export function AchievementCard({
  icon,
  name,
  description,
  tier,
  isUnlocked,
  currentProgress,
  targetProgress,
  unlockedDate,
}: AchievementCardProps) {
  const tierColor = getTierColor(tier);
  const tierBgColor = getTierBackgroundColor(tier);

  return (
    <View
      className="p-4 rounded-xl border border-border gap-3"
      style={{
        backgroundColor: isUnlocked ? tierBgColor : "#f5f5f5",
        borderColor: isUnlocked ? tierColor : "#ddd",
      }}
    >
      <View className="flex-row items-start gap-3">
        <Text className="text-3xl">{icon}</Text>
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-foreground flex-1">{name}</Text>
            {isUnlocked && (
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 12,
                  backgroundColor: tierColor,
                }}
              >
                <Text className="text-xs font-semibold text-white capitalize">{tier}</Text>
              </View>
            )}
          </View>
          <Text className="text-sm text-muted">{description}</Text>
        </View>
      </View>

      {currentProgress !== undefined && targetProgress !== undefined && (
        <AchievementProgress
          currentProgress={currentProgress}
          targetProgress={targetProgress}
          isUnlocked={isUnlocked}
        />
      )}

      {isUnlocked && unlockedDate && (
        <Text className="text-xs text-muted">
          Desbloqueado em {new Date(unlockedDate).toLocaleDateString("pt-BR")}
        </Text>
      )}

      {!isUnlocked && currentProgress !== undefined && targetProgress !== undefined && (
        <Text className="text-xs text-muted">
          {targetProgress - currentProgress} para desbloquear
        </Text>
      )}
    </View>
  );
}
