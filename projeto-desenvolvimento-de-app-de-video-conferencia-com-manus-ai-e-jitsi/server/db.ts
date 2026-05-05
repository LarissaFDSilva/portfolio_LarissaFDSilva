import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  userProgress,
  challengeResults,
  lessonAttendance,
  achievements,
  InsertUserProgress,
  InsertChallengeResult,
  InsertLessonAttendance,
  InsertAchievement,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ Progress Functions ============

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  if (result.length === 0) {
    // Create initial progress if doesn't exist
    await db.insert(userProgress).values({
      userId,
      totalXP: 0,
      level: 1,
      challengesCompleted: 0,
      lessonsAttended: 0,
    });
    return {
      id: 0,
      userId,
      totalXP: 0,
      level: 1,
      challengesCompleted: 0,
      lessonsAttended: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return result[0];
}

export async function updateUserProgress(userId: number, data: Partial<InsertUserProgress>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userProgress).set(data).where(eq(userProgress.userId, userId));
}

export async function saveChallengeResult(data: InsertChallengeResult) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Save challenge result
  await db.insert(challengeResults).values(data);

  // Update user progress
  const progress = await getUserProgress(data.userId);
  if (progress) {
    const newXP = progress.totalXP + data.xpEarned;
    const newLevel = Math.floor(newXP / 100) + 1;

    await updateUserProgress(data.userId, {
      totalXP: newXP,
      level: newLevel,
      challengesCompleted: progress.challengesCompleted + 1,
    });
  }
}

export async function getUserChallengeResults(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(challengeResults).where(eq(challengeResults.userId, userId));
}

export async function recordLessonAttendance(data: InsertLessonAttendance) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Save lesson attendance
  await db.insert(lessonAttendance).values(data);

  // Update user progress
  const progress = await getUserProgress(data.userId);
  if (progress) {
    await updateUserProgress(data.userId, {
      lessonsAttended: progress.lessonsAttended + 1,
    });
  }
}

export async function getUserLessonHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(lessonAttendance).where(eq(lessonAttendance.userId, userId));
}

export async function unlockAchievement(data: InsertAchievement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { and } = await import("drizzle-orm");

  // Check if already unlocked
  const existing = await db
    .select()
    .from(achievements)
    .where(
      and(
        eq(achievements.userId, data.userId),
        eq(achievements.achievementId, data.achievementId),
      ),
    );

  if (existing.length > 0) {
    return existing[0]; // Already unlocked
  }

  // Unlock new achievement
  await db.insert(achievements).values(data);
}

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(achievements).where(eq(achievements.userId, userId));
}
