CREATE TABLE `articles` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text,
	`excerpt` text,
	`content` text,
	`author` text,
	`published_on` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX `slugIdx` ON `articles` (`slug`);
CREATE UNIQUE INDEX `nameIdx` ON `articles` (`title`);