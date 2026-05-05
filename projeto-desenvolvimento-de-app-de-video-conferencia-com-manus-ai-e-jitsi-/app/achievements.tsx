import { ScrollView, View, Text, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { AchievementCard, AchievementBadge } from "@/components/achievement-badge";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import {
  ACHIEVEMENTS,
  ACHIEVEMENTS_BY_TIER,
  ACHIEVEMENTS_BY_CATEGORY,
  AchievementTier,
  AchievementCategory,
} from "@/shared/achievements";
import { useColors } from "@/hooks/use-colors";

type FilterType = "all" | AchievementTier | AchievementCategory;

export default function AchievementsScreen() {
  const { user } = useAuth();
  const colors = useColors();
  const [filter, setFilter] = useState<FilterType>("all");
  const [achievements, setAchievements] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const achievementsQuery = trpc.progress.getAchievements.useQuery(undefined, {
    enabled: !!user,
  });

  const progressQuery = trpc.progress.getChallenges.useQuery(undefined, {
    enabled: !!user,
  });

  useEffect(() => {
    if (achievementsQuery.data) {
      setAchievements(achievementsQuery.data);
    }
  }, [achievementsQuery.data]);

  useEffect(() => {
    if (achievementsQuery.data) {
      // Obter progresso de cada conquista
      const progressMap = achievementsQuery.data.map((a: any) => ({
        achievementId: a.achievementId,
        currentProgress: a.currentProgress || 0,
        targetProgress: a.targetProgress || 0,
      }));
      setProgress(progressMap);
    }
    setLoading(achievementsQuery.isLoading);
  }, [achievementsQuery.data, achievementsQuery.isLoading]);

  // Filtrar conquistas
  const getFilteredAchievements = () => {
    const allAchievements = Object.values(ACHIEVEMENTS);

    if (filter === "all") return allAchievements;

    if (["bronze", "silver", "gold", "platinum"].includes(filter)) {
      return allAchievements.filter((a) => a.tier === filter);
    }

    if (
      ["lessons", "challenges", "xp", "instruments", "social", "milestones"].includes(filter)
    ) {
      return allAchievements.filter((a) => a.category === filter);
    }

    return allAchievements;
  };

  const filteredAchievements = getFilteredAchievements();
  const unlockedCount = achievements.length;
  const totalCount = Object.keys(ACHIEVEMENTS).length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4 gap-4">
        {/* Header com Estatísticas */}
        <View className="gap-3">
          <Text className="text-2xl font-bold text-foreground">Conquistas</Text>

          {/* Progresso Geral */}
          <View className="bg-surface rounded-xl p-4 gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-base font-semibold text-foreground">Progresso Geral</Text>
              <Text className="text-lg font-bold text-primary">{completionPercentage}%</Text>
            </View>
            <View className="h-3 bg-muted/20 rounded-full overflow-hidden">
              <View
                style={{
                  height: "100%",
                  width: `${completionPercentage}%`,
                  backgroundColor: colors.primary,
                }}
              />
            </View>
            <Text className="text-sm text-muted">
              {unlockedCount} de {totalCount} conquistas desbloqueadas
            </Text>
          </View>

          {/* Estatísticas por Tier */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Por Tier</Text>
            <View className="flex-row gap-2">
              {(["bronze", "silver", "gold", "platinum"] as const).map((tier) => {
                const tierAchievements = ACHIEVEMENTS_BY_TIER[tier];
                const unlockedInTier = achievements.filter((a) => a.tier === tier).length;
                return (
                  <Pressable
                    key={tier}
                    onPress={() => setFilter(filter === tier ? "all" : tier)}
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  >
                    <View
                      className={`flex-1 p-2 rounded-lg items-center gap-1 ${
                        filter === tier ? "bg-primary/20" : "bg-muted/10"
                      }`}
                    >
                      <Text className="text-xs font-semibold text-foreground capitalize">
                        {tier}
                      </Text>
                      <Text className="text-sm font-bold text-primary">
                        {unlockedInTier}/{tierAchievements.length}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Filtro por Categoria */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Por Categoria</Text>
            <View className="flex-row gap-2 flex-wrap">
              {(
                [
                  "all",
                  "lessons",
                  "challenges",
                  "xp",
                  "instruments",
                  "social",
                  "milestones",
                ] as const
              ).map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setFilter(category)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View
                    className={`px-3 py-1 rounded-full ${
                      filter === category ? "bg-primary" : "bg-muted/20"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        filter === category ? "text-background" : "text-foreground"
                      }`}
                    >
                      {category === "all" ? "Todas" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Grid de Conquistas */}
        <View className="gap-4">
          <Text className="text-sm font-semibold text-muted">
            {filteredAchievements.length} conquistas
          </Text>

          {filteredAchievements.length > 0 ? (
            <View className="gap-3">
              {filteredAchievements.map((achievement) => {
                const isUnlocked = achievements.some((a) => a.achievementId === achievement.id);
                const progressData = progress.find((p: any) => p.achievementId === achievement.id);

                return (
                  <AchievementCard
                    key={achievement.id}
                    icon={achievement.icon}
                    name={achievement.name}
                    description={achievement.description}
                    tier={achievement.tier}
                    isUnlocked={isUnlocked}
                    currentProgress={progressData?.currentProgress || 0}
                    targetProgress={progressData?.targetProgress || achievement.criteria.target}
                    unlockedDate={
                      achievements.find((a) => a.achievementId === achievement.id)?.unlockedAt
                    }
                  />
                );
              })}
            </View>
          ) : (
            <View className="items-center justify-center py-8 gap-2">
              <Text className="text-lg font-semibold text-foreground">Nenhuma conquista</Text>
              <Text className="text-sm text-muted">Ajuste os filtros para ver mais</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
