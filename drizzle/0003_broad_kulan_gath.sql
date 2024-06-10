CREATE TABLE `session` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(64),
	`timestamp` timestamp(6),
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
