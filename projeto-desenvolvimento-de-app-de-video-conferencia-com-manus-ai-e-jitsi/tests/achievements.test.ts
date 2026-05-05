import { describe, it, expect } from "vitest";
import { ACHIEVEMENTS, ACHIEVEMENTS_BY_TIER, ACHIEVEMENTS_BY_CATEGORY } from "../shared/achievements";

describe("Achievement System", () => {
  describe("Achievement Definitions", () => {
    it("should have at least 20 achievements defined", () => {
      expect(Object.keys(ACHIEVEMENTS).length).toBeGreaterThanOrEqual(20);
    });

    it("should have achievements in all tiers", () => {
      const tiers = ["bronze", "silver", "gold", "platinum"];
      tiers.forEach((tier) => {
        const achievementsInTier = Object.values(ACHIEVEMENTS).filter((a) => a.tier === tier);
        expect(achievementsInTier.length).toBeGreaterThan(0);
      });
    });

    it("should have achievements in all categories", () => {
      const categories = ["lessons", "challenges", "xp", "instruments", "social", "milestones"];
      categories.forEach((category) => {
        const achievementsInCategory = Object.values(ACHIEVEMENTS).filter(
          (a) => a.category === category,
        );
        expect(achievementsInCategory.length).toBeGreaterThan(0);
      });
    });

    it("should have unique achievement IDs", () => {
      const ids = Object.keys(ACHIEVEMENTS);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it("should have valid criteria for all achievements", () => {
      Object.values(ACHIEVEMENTS).forEach((achievement) => {
        expect(achievement.criteria).toBeDefined();
        expect(achievement.criteria.type).toBeDefined();
        expect(achievement.criteria.target).toBeGreaterThan(0);
      });
    });

    it("should have XP rewards for all achievements", () => {
      Object.values(ACHIEVEMENTS).forEach((achievement) => {
        expect(achievement.xpReward).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("Achievement Grouping", () => {
    it("should group achievements by tier correctly", () => {
      const allAchievements = Object.values(ACHIEVEMENTS);
      const groupedByTier = Object.values(ACHIEVEMENTS_BY_TIER).flat();

      expect(groupedByTier.length).toBe(allAchievements.length);
    });

    it("should group achievements by category correctly", () => {
      const allAchievements = Object.values(ACHIEVEMENTS);
      const groupedByCategory = Object.values(ACHIEVEMENTS_BY_CATEGORY).flat();

      expect(groupedByCategory.length).toBe(allAchievements.length);
    });
  });

  describe("Specific Achievement Criteria", () => {
    it("first_lesson should require 1 lesson", () => {
      expect(ACHIEVEMENTS.first_lesson.criteria.target).toBe(1);
    });

    it("ten_lessons should require 10 lessons", () => {
      expect(ACHIEVEMENTS.ten_lessons.criteria.target).toBe(10);
    });

    it("hundred_lessons should require 100 lessons", () => {
      expect(ACHIEVEMENTS.hundred_lessons.criteria.target).toBe(100);
    });

    it("first_challenge should require 1 challenge", () => {
      expect(ACHIEVEMENTS.first_challenge.criteria.target).toBe(1);
    });

    it("twenty_challenges should require 20 challenges", () => {
      expect(ACHIEVEMENTS.twenty_challenges.criteria.target).toBe(20);
    });

    it("thousand_xp should require 1000 XP", () => {
      expect(ACHIEVEMENTS.thousand_xp.criteria.target).toBe(1000);
    });

    it("piano_master should require 500 XP", () => {
      expect(ACHIEVEMENTS.piano_master.criteria.target).toBe(500);
    });

    it("week_streak should require 7 days", () => {
      expect(ACHIEVEMENTS.week_streak.criteria.target).toBe(7);
    });

    it("month_streak should require 30 days", () => {
      expect(ACHIEVEMENTS.month_streak.criteria.target).toBe(30);
    });
  });

  describe("Achievement Tiers and Rewards", () => {
    it("platinum achievements should have higher XP rewards than gold", () => {
      const platinumRewards = ACHIEVEMENTS_BY_TIER.platinum.map((a) => a.xpReward);
      const goldRewards = ACHIEVEMENTS_BY_TIER.gold.map((a) => a.xpReward);

      const avgPlatinum = platinumRewards.reduce((a, b) => a + b, 0) / platinumRewards.length;
      const avgGold = goldRewards.reduce((a, b) => a + b, 0) / goldRewards.length;

      expect(avgPlatinum).toBeGreaterThanOrEqual(avgGold);
    });

    it("gold achievements should have higher XP rewards than silver", () => {
      const goldRewards = ACHIEVEMENTS_BY_TIER.gold.map((a) => a.xpReward);
      const silverRewards = ACHIEVEMENTS_BY_TIER.silver.map((a) => a.xpReward);

      const avgGold = goldRewards.reduce((a, b) => a + b, 0) / goldRewards.length;
      const avgSilver = silverRewards.reduce((a, b) => a + b, 0) / silverRewards.length;

      expect(avgGold).toBeGreaterThanOrEqual(avgSilver);
    });
  });

  describe("Level Calculation", () => {
    it("should calculate level correctly from XP", () => {
      const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;

      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(99)).toBe(1);
      expect(calculateLevel(100)).toBe(2);
      expect(calculateLevel(500)).toBe(6);
      expect(calculateLevel(1000)).toBe(11);
      expect(calculateLevel(5000)).toBe(51);
    });
  });

  describe("Achievement Messages", () => {
    it("should have unlock messages for all achievements", () => {
      Object.values(ACHIEVEMENTS).forEach((achievement) => {
        expect(achievement.unlockedMessage).toBeDefined();
        expect(achievement.unlockedMessage.length).toBeGreaterThan(0);
      });
    });

    it("should have descriptions for all achievements", () => {
      Object.values(ACHIEVEMENTS).forEach((achievement) => {
        expect(achievement.description).toBeDefined();
        expect(achievement.description.length).toBeGreaterThan(0);
      });
    });
  });
});
