create database compproject;

use compproject;

create table user (
    id          int             not null auto_increment,
    fname       varchar(50)     not null,
    lname       varchar(50)     not null,

    primary key id
);

create table teacher (

);

create table student (

);

create table questions (
    id          int             not null auto_increment,

);

create table responses (
    id          int             not null auto_increment,
    responder   int             not null,
    text        varchar(255),

    primary key id
    foreign key responder references user.id
);

