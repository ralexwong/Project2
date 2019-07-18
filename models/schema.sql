DROP DATABASE IF EXISTS movieDB;
CREATE DATABASE movieDB;

USE movieDB;

CREATE TABLE shows (
    id INT NOT NULL AUTO_INCREMENT,
    show_id INT NOT NULL,
    subscription VARCHAR(50),
    'year' INT(4) NOT NULL,
    'genre' VARCHAR(100) NOT NULL,
    'episode_name' VARCHAR(100) NOT NULL,
    'session' INT(2) NOT NULL,
    'guideboxURL' VARCHAR(300),
    PRIMARY KEY ('show_id')
);

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT,
    movie_id INT NOT NULL,
    subscription VARCHAR(50),
    year INT(4) NOT NULL,
    'genre' VARCHAR(100) NOT NULL,
    'guideboxURL' VARCHAR(300),
    PRIMARY KEY ('movie_id')
);

CREATE TABLE 'userInfo' (
    'user_id' INT NOT NULL AUTO_INCREMENT,
    'first_name' VARCHAR(100) NOT NULL,
    'last_name' VARCHAR(100) NOT NULL,
    'password' VARCHAR(12) NOT NULL,
    PRIMARY KEY ('user_id')
);

CREATE TABLE favorites (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    tv_id INT NOT NULL

)
