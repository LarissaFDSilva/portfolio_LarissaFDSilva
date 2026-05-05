import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  progress: router({
    get: protectedProcedure.query(({ ctx }) => {
      return db.getUserProgress(ctx.user.id);
    }),

    getChallenges: protectedProcedure.query(({ ctx }) => {
      return db.getUserChallengeResults(ctx.user.id);
    }),

    saveChallengeResult: protectedProcedure
      .input(
        z.object({
          challengeId: z.string(),
          title: z.string(),
          accuracy: z.number().min(0).max(100),
          xpEarned: z.number().min(0),
        }),
      )
      .mutation(({ ctx, input }) => {
        return db.saveChallengeResult({
          userId: ctx.user.id,
          challengeId: input.challengeId,
          title: input.title,
          accuracy: input.accuracy,
          xpEarned: input.xpEarned,
        });
      }),

    recordLesson: protectedProcedure
      .input(
        z.object({
          lessonId: z.string(),
          lessonName: z.string(),
          durationMinutes: z.number().min(1),
        }),
      )
      .mutation(({ ctx, input }) => {
        return db.recordLessonAttendance({
          userId: ctx.user.id,
          lessonId: input.lessonId,
          lessonName: input.lessonName,
          durationMinutes: input.durationMinutes,
        });
      }),

    saveAchievement: protectedProcedure
      .input(
        z.object({
          achievementId: z.string(),
          name: z.string(),
        }),
      )
      .mutation(({ ctx, input }) => {
        return db.unlockAchievement({
          userId: ctx.user.id,
          achievementId: input.achievementId,
          name: input.name,
        });
      }),

    getLessonHistory: protectedProcedure.query(({ ctx }) => {
      return db.getUserLessonHistory(ctx.user.id);
    }),

    getAchievements: protectedProcedure.query(({ ctx }) => {
      return db.getUserAchievements(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
