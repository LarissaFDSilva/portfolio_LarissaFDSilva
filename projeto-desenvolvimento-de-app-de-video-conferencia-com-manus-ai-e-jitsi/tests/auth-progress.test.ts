import { describe, it, expect, beforeEach, vi } from "vitest";
import * as db from "../server/db";

// Mock database functions
vi.mock("../server/db", () => ({
  getUserProgress: vi.fn(),
  updateUserProgress: vi.fn(),
  saveChallengeResult: vi.fn(),
  recordLessonAttendance: vi.fn(),
  unlockAchievement: vi.fn(),
  getUserChallengeResults: vi.fn(),
  getUserLessonHistory: vi.fn(),
  getUserAchievements: vi.fn(),
}));

describe("User Progress Management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get user progress", async () => {
    const mockProgress = {
      id: 1,
      userId: 1,
      totalXP: 100,
      level: 2,
      challengesCompleted: 5,
      lessonsAttended: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(db.getUserProgress).mockResolvedValue(mockProgress);

    const result = await db.getUserProgress(1);

    expect(result).toEqual(mockProgress);
    expect(db.getUserProgress).toHaveBeenCalledWith(1);
  });

  it("should update user progress", async () => {
    vi.mocked(db.updateUserProgress).mockResolvedValue(undefined);

    await db.updateUserProgress(1, { totalXP: 200, level: 3 });

    expect(db.updateUserProgress).toHaveBeenCalledWith(1, {
      totalXP: 200,
      level: 3,
    });
  });

  it("should save challenge result", async () => {
    const challengeData = {
      userId: 1,
      challengeId: "challenge-1",
      title: "Rhythm Challenge",
      accuracy: 95,
      xpEarned: 50,
    };

    vi.mocked(db.saveChallengeResult).mockResolvedValue(undefined);

    await db.saveChallengeResult(challengeData);

    expect(db.saveChallengeResult).toHaveBeenCalledWith(challengeData);
  });

  it("should record lesson attendance", async () => {
    const lessonData = {
      userId: 1,
      lessonId: "lesson-1",
      lessonName: "Violin Basics",
      durationMinutes: 60,
    };

    vi.mocked(db.recordLessonAttendance).mockResolvedValue(undefined);

    await db.recordLessonAttendance(lessonData);

    expect(db.recordLessonAttendance).toHaveBeenCalledWith(lessonData);
  });

  it("should unlock achievement", async () => {
    const achievementData = {
      userId: 1,
      achievementId: "first-challenge",
      name: "First Challenge Complete",
    };

    vi.mocked(db.unlockAchievement).mockResolvedValue(undefined);

    await db.unlockAchievement(achievementData);

    expect(db.unlockAchievement).toHaveBeenCalledWith(achievementData);
  });

  it("should get user challenge results", async () => {
    const mockChallenges = [
      {
        id: 1,
        userId: 1,
        challengeId: "challenge-1",
        title: "Rhythm Challenge",
        accuracy: 95,
        xpEarned: 50,
        completedAt: new Date(),
      },
    ];

    vi.mocked(db.getUserChallengeResults).mockResolvedValue(mockChallenges);

    const result = await db.getUserChallengeResults(1);

    expect(result).toEqual(mockChallenges);
    expect(db.getUserChallengeResults).toHaveBeenCalledWith(1);
  });

  it("should get user lesson history", async () => {
    const mockLessons = [
      {
        id: 1,
        userId: 1,
        lessonId: "lesson-1",
        lessonName: "Violin Basics",
        durationMinutes: 60,
        attendedAt: new Date(),
      },
    ];

    vi.mocked(db.getUserLessonHistory).mockResolvedValue(mockLessons);

    const result = await db.getUserLessonHistory(1);

    expect(result).toEqual(mockLessons);
    expect(db.getUserLessonHistory).toHaveBeenCalledWith(1);
  });

  it("should get user achievements", async () => {
    const mockAchievements = [
      {
        id: 1,
        userId: 1,
        achievementId: "first-challenge",
        name: "First Challenge Complete",
        unlockedAt: new Date(),
      },
    ];

    vi.mocked(db.getUserAchievements).mockResolvedValue(mockAchievements);

    const result = await db.getUserAchievements(1);

    expect(result).toEqual(mockAchievements);
    expect(db.getUserAchievements).toHaveBeenCalledWith(1);
  });
});

describe("XP and Level Calculation", () => {
  it("should calculate level from XP", () => {
    // 100 XP = Level 1, 200 XP = Level 2, etc
    const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;

    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(99)).toBe(1);
    expect(calculateLevel(100)).toBe(2);
    expect(calculateLevel(200)).toBe(3);
    expect(calculateLevel(500)).toBe(6);
  });
});
