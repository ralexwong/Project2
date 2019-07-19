DROP DATABASE IF EXISTS movieDB;
CREATE DATABASE movieDB;

USE movieDB;

-- CREATE TABLE shows (
--     show_id INTEGER(30) AUTO_INCREMENT NOT NULL,
--     year INT(4) NOT NULL,
--     genre VARCHAR(100) NOT NULL,
--     episode_name VARCHAR(100) NOT NULL,
--     session INT(2) NOT NULL,
--     guideboxURL VARCHAR(300),
--     PRIMARY KEY (`show_id`)
-- );

-- CREATE TABLE `movies` (
--     `movie_id` INTEGER(30) AUTO_INCREMENT NOT NULL,
--     `title` VARCHAR(100) NOT NULL,
--     `year` INT(4) NOT NULL,
--     `genre` VARCHAR(100) NOT NULL,
--     `guidebox_url` VARCHAR(300),
--     `image_url` VARCHAR(300)
--     PRIMARY KEY (`movie_id`)
-- );

-- CREATE TABLE movies (
--    id INTEGER(30) AUTO_INCREMENT NOT NULL,
--    `api_id` INTEGER(20) NOT NULL,
--    `title` VARCHAR(100) NOT NULL,
--    `release_year` INTEGER(4) NOT NULL,
--    `rating` VARCHAR(10) NOT NULL,
--    `genre` VARCHAR(100) NOT NULL,
--    `image_url` VARCHAR(300),
--    `overview` VARCHAR(1000),
--    PRIMARY KEY (id)
-- );


-- CREATE TABLE topMovieData (
--     `id` INTEGER(30) AUTO_INCREMENT NOT NULL,
--    `api_id` INTEGER(20) NOT NULL,
--    `title` VARCHAR(100) NOT NULL,
--    `release_year` INTEGER(4) NOT NULL,
--    `rating` VARCHAR(10) NOT NULL,
--    `image_url` VARCHAR(300),
--    PRIMARY KEY (id)
-- );

-- CREATE TABLE `userInfo` (
--     `user_id` INTEGER(30) AUTO_INCREMENT NOT NULL,
--     `first_name` VARCHAR(100) NOT NULL,
--     `last_name` VARCHAR(100) NOT NULL,
--     `password` VARCHAR(12) NOT NULL,
--     PRIMARY KEY (`user_id`)
-- );

-- CREATE TABLE `favorites` (

-- )
