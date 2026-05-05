CREATE TABLE `achievement_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`tier` enum('bronze','silver','gold','platinum') NOT NULL,
	`category` enum('lessons','challenges','xp','instruments','social','milestones') NOT NULL,
	`icon` varchar(64) NOT NULL,
	`xpReward` int NOT NULL DEFAULT 0,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievement_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `achievement_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` varchar(64) NOT NULL,
	`currentProgress` int NOT NULL DEFAULT 0,
	`targetProgress` int NOT NULL,
	`isUnlocked` int NOT NULL DEFAULT 0,
	`unlockedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `achievement_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lesson_streaks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`lastLessonDate` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lesson_streaks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_instruments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`instrumentName` varchar(64) NOT NULL,
	`xpEarned` int NOT NULL DEFAULT 0,
	`isMastered` int NOT NULL DEFAULT 0,
	`masteredAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_instruments_id` PRIMARY KEY(`id`)
);
