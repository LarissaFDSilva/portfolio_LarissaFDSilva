/**
 * Funções de gerenciamento de conquistas e gamificação
 */

import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import {
  achievementDetails,
  achievementProgress,
  lessonStreaks,
  userInstruments,
  InsertAchievementDetail,
  InsertAchievementProgress,
  InsertLessonStreak,
  InsertUserInstrument,
} from "../drizzle/schema";
import { ACHIEVEMENTS, AchievementDefinition } from "../shared/achievements";

// ============ Achievement Progress ============

export async function initializeAchievementProgress(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Inicializar progresso para todas as conquistas
  for (const achievement of Object.values(ACHIEVEMENTS)) {
    const existing = await db
      .select()
      .from(achievementProgress)
      .where(
        and(
          eq(achievementProgress.userId, userId),
          eq(achievementProgress.achievementId, achievement.id),
        ),
      );

    if (existing.length === 0) {
      await db.insert(achievementProgress).values({
        userId,
        achievementId: achievement.id,
        currentProgress: 0,
        targetProgress: achievement.criteria.target,
        isUnlocked: 0,
      });
    }
  }
}

export async function updateAchievementProgress(
  userId: number,
  achievementId: string,
  currentProgress: number,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) throw new Error("Achievement not found");

  // Verificar se deve desbloquear
  const shouldUnlock = currentProgress >= achievement.criteria.target;

  await db
    .update(achievementProgress)
    .set({
      currentProgress,
      isUnlocked: shouldUnlock ? 1 : 0,
      unlockedAt: shouldUnlock ? new Date() : null,
    })
    .where(
      and(
        eq(achievementProgress.userId, userId),
        eq(achievementProgress.achievementId, achievementId),
      ),
    );

  return shouldUnlock;
}

export async function getAchievementProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(achievementProgress)
    .where(eq(achievementProgress.userId, userId));
}

// ============ Achievement Unlocking ============

export async function unlockAchievementIfEligible(
  userId: number,
  achievementId: string,
): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) throw new Error("Achievement not found");

  // Verificar se já foi desbloqueado
  const existing = await db
    .select()
    .from(achievementDetails)
    .where(
      and(
        eq(achievementDetails.userId, userId),
        eq(achievementDetails.achievementId, achievementId),
      ),
    );

  if (existing.length > 0) {
    return false; // Já desbloqueado
  }

  // Desbloquear conquista
  await db.insert(achievementDetails).values({
    userId,
    achievementId: achievement.id,
    name: achievement.name,
    description: achievement.description,
    tier: achievement.tier,
    category: achievement.category,
    icon: achievement.icon,
    xpReward: achievement.xpReward,
  });

  return true;
}

export async function getUserAchievementDetails(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(achievementDetails)
    .where(eq(achievementDetails.userId, userId));
}

// ============ Lesson Streaks ============

export async function updateLessonStreak(userId: number, lessonDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(lessonStreaks)
    .where(eq(lessonStreaks.userId, userId));

  if (existing.length === 0) {
    // Primeira aula
    await db.insert(lessonStreaks).values({
      userId,
      currentStreak: 1,
      longestStreak: 1,
      lastLessonDate: lessonDate,
    });
    return 1;
  }

  const streak = existing[0];
  const lastDate = streak.lastLessonDate ? new Date(streak.lastLessonDate) : null;
  const today = new Date(lessonDate);
  today.setHours(0, 0, 0, 0);

  let newStreak = streak.currentStreak;

  if (lastDate) {
    const lastDateNormalized = new Date(lastDate);
    lastDateNormalized.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (today.getTime() - lastDateNormalized.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDiff === 1) {
      // Aula no dia seguinte - continuar sequência
      newStreak = streak.currentStreak + 1;
    } else if (daysDiff > 1) {
      // Quebrou a sequência - recomeçar
      newStreak = 1;
    }
    // daysDiff === 0 significa mesma aula no mesmo dia - não incrementar
  }

  const newLongestStreak = Math.max(newStreak, streak.longestStreak);

  await db
    .update(lessonStreaks)
    .set({
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastLessonDate: lessonDate,
    })
    .where(eq(lessonStreaks.userId, userId));

  return newStreak;
}

export async function getLessonStreak(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(lessonStreaks)
    .where(eq(lessonStreaks.userId, userId));

  return result[0] || null;
}

// ============ User Instruments ============

export async function trackInstrumentXP(
  userId: number,
  instrumentName: string,
  xpEarned: number,
): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(userInstruments)
    .where(
      and(
        eq(userInstruments.userId, userId),
        eq(userInstruments.instrumentName, instrumentName),
      ),
    );

  const newXP = existing.length > 0 ? existing[0].xpEarned + xpEarned : xpEarned;
  const isMastered = newXP >= 500; // 500 XP para dominar

  if (existing.length > 0) {
    await db
      .update(userInstruments)
      .set({
        xpEarned: newXP,
        isMastered: isMastered ? 1 : 0,
        masteredAt: isMastered && existing[0].isMastered === 0 ? new Date() : existing[0].masteredAt,
      })
      .where(
        and(
          eq(userInstruments.userId, userId),
          eq(userInstruments.instrumentName, instrumentName),
        ),
      );
  } else {
    await db.insert(userInstruments).values({
      userId,
      instrumentName,
      xpEarned: newXP,
      isMastered: isMastered ? 1 : 0,
      masteredAt: isMastered ? new Date() : null,
    });
  }

  // Retornar true se foi dominado nesta chamada
  return isMastered && (existing.length === 0 || existing[0].isMastered === 0);
}

export async function getUserInstruments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userInstruments).where(eq(userInstruments.userId, userId));
}

export async function getMasteredInstruments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select()
    .from(userInstruments)
    .where(and(eq(userInstruments.userId, userId), eq(userInstruments.isMastered, 1)));

  return result;
}

// ============ Achievement Checking ============

export async function checkAndUnlockAchievements(
  userId: number,
  userProgress: any,
  lessonCount: number,
  challengeCount: number,
  totalXP: number,
) {
  const unlockedAchievements: string[] = [];

  // Verificar conquistas de aulas
  if (lessonCount >= 1) {
    if (await unlockAchievementIfEligible(userId, "first_lesson")) {
      unlockedAchievements.push("first_lesson");
    }
  }
  if (lessonCount >= 10) {
    if (await unlockAchievementIfEligible(userId, "ten_lessons")) {
      unlockedAchievements.push("ten_lessons");
    }
  }
  if (lessonCount >= 50) {
    if (await unlockAchievementIfEligible(userId, "fifty_lessons")) {
      unlockedAchievements.push("fifty_lessons");
    }
  }
  if (lessonCount >= 100) {
    if (await unlockAchievementIfEligible(userId, "hundred_lessons")) {
      unlockedAchievements.push("hundred_lessons");
    }
  }

  // Verificar conquistas de desafios
  if (challengeCount >= 1) {
    if (await unlockAchievementIfEligible(userId, "first_challenge")) {
      unlockedAchievements.push("first_challenge");
    }
  }
  if (challengeCount >= 5) {
    if (await unlockAchievementIfEligible(userId, "five_challenges")) {
      unlockedAchievements.push("five_challenges");
    }
  }
  if (challengeCount >= 20) {
    if (await unlockAchievementIfEligible(userId, "twenty_challenges")) {
      unlockedAchievements.push("twenty_challenges");
    }
  }

  // Verificar conquistas de XP
  if (totalXP >= 100) {
    if (await unlockAchievementIfEligible(userId, "hundred_xp")) {
      unlockedAchievements.push("hundred_xp");
    }
  }
  if (totalXP >= 500) {
    if (await unlockAchievementIfEligible(userId, "five_hundred_xp")) {
      unlockedAchievements.push("five_hundred_xp");
    }
  }
  if (totalXP >= 1000) {
    if (await unlockAchievementIfEligible(userId, "thousand_xp")) {
      unlockedAchievements.push("thousand_xp");
    }
  }
  if (totalXP >= 5000) {
    if (await unlockAchievementIfEligible(userId, "five_thousand_xp")) {
      unlockedAchievements.push("five_thousand_xp");
    }
  }

  // Verificar conquistas de nível
  const level = Math.floor(totalXP / 100) + 1;
  if (level >= 5) {
    if (await unlockAchievementIfEligible(userId, "level_five")) {
      unlockedAchievements.push("level_five");
    }
  }
  if (level >= 10) {
    if (await unlockAchievementIfEligible(userId, "level_ten")) {
      unlockedAchievements.push("level_ten");
    }
  }
  if (level >= 20) {
    if (await unlockAchievementIfEligible(userId, "level_twenty")) {
      unlockedAchievements.push("level_twenty");
    }
  }

  return unlockedAchievements;
}
