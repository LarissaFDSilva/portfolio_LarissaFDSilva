import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Progresso do usuário
export const userProgress = mysqlTable("user_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  totalXP: int("totalXP").default(0).notNull(),
  level: int("level").default(1).notNull(),
  challengesCompleted: int("challengesCompleted").default(0).notNull(),
  lessonsAttended: int("lessonsAttended").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Resultados de desafios
export const challengeResults = mysqlTable("challenge_results", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  challengeId: varchar("challengeId", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  accuracy: int("accuracy").notNull(), // 0-100
  xpEarned: int("xpEarned").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

// Aulas frequentadas
export const lessonAttendance = mysqlTable("lesson_attendance", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  lessonName: varchar("lessonName", { length: 255 }).notNull(),
  durationMinutes: int("durationMinutes").notNull(),
  attendedAt: timestamp("attendedAt").defaultNow().notNull(),
});

// Conquistas desbloqueadas
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: varchar("achievementId", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

// Tabela detalhada de conquistas com metadados
export const achievementDetails = mysqlTable("achievement_details", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: varchar("achievementId", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  tier: mysqlEnum("tier", ["bronze", "silver", "gold", "platinum"]).notNull(),
  category: mysqlEnum("category", ["lessons", "challenges", "xp", "instruments", "social", "milestones"]).notNull(),
  icon: varchar("icon", { length: 64 }).notNull(),
  xpReward: int("xpReward").default(0).notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

// Rastreamento de progresso para desbloqueio de conquistas
export const achievementProgress = mysqlTable("achievement_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: varchar("achievementId", { length: 64 }).notNull(),
  currentProgress: int("currentProgress").default(0).notNull(),
  targetProgress: int("targetProgress").notNull(),
  isUnlocked: int("isUnlocked").default(0).notNull(), // 0 = false, 1 = true
  unlockedAt: timestamp("unlockedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Rastreamento de sequências (streaks) de aulas
export const lessonStreaks = mysqlTable("lesson_streaks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastLessonDate: timestamp("lastLessonDate"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Rastreamento de instrumentos por usuário
export const userInstruments = mysqlTable("user_instruments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  instrumentName: varchar("instrumentName", { length: 64 }).notNull(),
  xpEarned: int("xpEarned").default(0).notNull(),
  isMastered: int("isMastered").default(0).notNull(), // 0 = false, 1 = true
  masteredAt: timestamp("masteredAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Tipos exportados
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;
export type ChallengeResult = typeof challengeResults.$inferSelect;
export type InsertChallengeResult = typeof challengeResults.$inferInsert;
export type LessonAttendance = typeof lessonAttendance.$inferSelect;
export type InsertLessonAttendance = typeof lessonAttendance.$inferInsert;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;
export type AchievementDetail = typeof achievementDetails.$inferSelect;
export type InsertAchievementDetail = typeof achievementDetails.$inferInsert;
export type AchievementProgress = typeof achievementProgress.$inferSelect;
export type InsertAchievementProgress = typeof achievementProgress.$inferInsert;
export type LessonStreak = typeof lessonStreaks.$inferSelect;
export type InsertLessonStreak = typeof lessonStreaks.$inferInsert;
export type UserInstrument = typeof userInstruments.$inferSelect;
export type InsertUserInstrument = typeof userInstruments.$inferInsert;
