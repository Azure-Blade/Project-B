CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320),
	`username` varchar(64),
	`password` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `blogs` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;