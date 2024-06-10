CREATE TABLE `blogs` (
	`id` int NOT NULL,
	`title` varchar(64),
	`content` text,
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`)
);
