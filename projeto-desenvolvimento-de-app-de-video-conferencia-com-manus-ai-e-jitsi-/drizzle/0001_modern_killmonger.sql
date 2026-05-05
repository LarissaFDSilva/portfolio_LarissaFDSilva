CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `challenge_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`challengeId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`accuracy` int NOT NULL,
	`xpEarned` int NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `challenge_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lesson_attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`lessonName` varchar(255) NOT NULL,
	`durationMinutes` int NOT NULL,
	`attendedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lesson_attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalXP` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`challengesCompleted` int NOT NULL DEFAULT 0,
	`lessonsAttended` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_progress_id` PRIMARY KEY(`id`)
);
