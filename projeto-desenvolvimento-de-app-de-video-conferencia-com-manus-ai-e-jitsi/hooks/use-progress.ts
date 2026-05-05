import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "./use-auth";

export interface UserProgress {
  id: number;
  userId: number;
  totalXP: number;
  level: number;
  challengesCompleted: number;
  lessonsAttended: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChallengeResult {
  challengeId: string;
  title: string;
  accuracy: number;
  xpEarned: number;
  completedAt: Date;
}

export function useProgress() {
  const { user, isAuthenticated } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Queries
  const getProgressQuery = trpc.progress.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const getChallengesQuery = trpc.progress.getChallenges.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Mutations
  const saveChallengeResultMutation = trpc.progress.saveChallengeResult.useMutation({
    onSuccess: () => {
      getProgressQuery.refetch();
    },
  });

  const saveAchievementMutation = trpc.progress.saveAchievement.useMutation({
    onSuccess: () => {
      getProgressQuery.refetch();
    },
  });

  const recordLessonMutation = trpc.progress.recordLesson.useMutation({
    onSuccess: () => {
      getProgressQuery.refetch();
    },
  });

  // Sync progress from query
  useEffect(() => {
    if (getProgressQuery.data) {
      setProgress(getProgressQuery.data);
    }
  }, [getProgressQuery.data]);

  // Helper functions
  const saveChallengeResult = useCallback(
    async (challengeId: string, title: string, accuracy: number, xpEarned: number) => {
      try {
        setLoading(true);
        await saveChallengeResultMutation.mutateAsync({
          challengeId,
          title,
          accuracy,
          xpEarned,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to save challenge result");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [saveChallengeResultMutation],
  );

  const unlockAchievement = useCallback(
    async (achievementId: string, name: string) => {
      try {
        setLoading(true);
        await saveAchievementMutation.mutateAsync({
          achievementId,
          name,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to unlock achievement");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [saveAchievementMutation],
  );

  const recordLessonAttendance = useCallback(
    async (lessonId: string, lessonName: string, durationMinutes: number) => {
      try {
        setLoading(true);
        await recordLessonMutation.mutateAsync({
          lessonId,
          lessonName,
          durationMinutes,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to record lesson");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [recordLessonMutation],
  );

  const calculateLevel = useCallback((xp: number): number => {
    // Cada nível requer 100 XP
    return Math.floor(xp / 100) + 1;
  }, []);

  return {
    progress,
    loading: loading || getProgressQuery.isLoading,
    error: error || (getProgressQuery.error as Error | null),
    challenges: getChallengesQuery.data || [],
    saveChallengeResult,
    unlockAchievement,
    recordLessonAttendance,
    calculateLevel,
    refetch: getProgressQuery.refetch,
  };
}
