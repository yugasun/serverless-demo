DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXIST `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `introduction` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_role_id_foreign_idx` (`role_id`),
  CONSTRAINT `users_role_id_foreign_idx` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `title` varchar(30) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign_idx` (`user_id`),
  CONSTRAINT `posts_user_id_foreign_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;


-- TRUNCATE `roles`;
-- INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
-- (1,	'admin',	'2020-02-04 09:54:25',	'2020-02-04 09:54:25'),
-- (2,	'editor',	'2020-02-04 09:54:30',	'2020-02-04 09:54:30');

-- TRUNCATE `users`;
-- INSERT INTO `users` (`id`, `name`, `password`, `age`, `avatar`, `introduction`, `created_at`, `updated_at`, `role_id`) VALUES
-- (1,	'admin',	'e10adc3949ba59abbe56e057f20f883e',	20,	'https://yugasun.com/static/avatar.jpg',	'Fullstack Engineer',	'2020-02-04 09:55:23',	'2020-02-04 09:55:23',	1);

-- TRUNCATE `posts`;
-- INSERT INTO `posts` (`id`, `title`, `content`, `created_at`, `updated_at`, `user_id`) VALUES
-- (2,	'Awesome Egg.js',	'Egg.js is a awesome framework',	'2020-02-04 09:57:24',	'2020-02-04 09:57:24',	1),
-- (3,	'Awesome Serverless',	'Build web, mobile and IoT applications using Tencent Cloud and API Gateway, Tencent Cloud Functions, and more.',	'2020-02-04 10:00:23',	'2020-02-04 10:00:23',	1);

-- 2020-02-05 08:10:33
