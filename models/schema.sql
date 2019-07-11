DROP DATABASE IF EXISTS movieDB;
CREATE DATABASE movieDB;

USE movieDB;

CREATE TABLE 'shows' (
    'show_id' INT NOT NULL AUTO_INCREMENT,
    'year' INT(4) NOT NULL,
    'genre' VARCHAR(100) NOT NULL,
    'eposide_name' VARCHAR(100) NOT NULL,
    'session' INT(2) NOT NULL,
    'guideboxURL' VARCHAR(300),
    PRIMARY KEY ('show_id')
);

CREATE TABLE 'moives' (
    'movie_id' INT NOT NULL AUTO_INCREMENT,
    'year' INT(4) NOT NULL,
    'genre' VARCHAR(100) NOT NULL,
    'guideboxURL' VARCHAR(300),
    PRIMARY KEY ('moive_id')
);

CREATE TABLE 'userInfo' (
    'user_id' INT NOT NULL AUTO_INCREMENT,
    'first_name' VARCHAR(100) NOT NULL,
    'last_name' VARCHAR(100) NOT NULL,
    'password' VARCHAR(12) NOT NULL,
    PRIMARY KEY ('user_id')
);

CREATE TABLE 'favorites' (

)
