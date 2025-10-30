create database rtql;

use rtql;

create table user (
    id          int             not null auto_increment,
    fname       varchar(50)     not null,
    lname       varchar(50)     not null,
    email       varchar(50)     not null,

    primary key (id)
);

-- create table teacher (
-- );

-- create table student (
-- );

create table question (
    id          int             not null auto_increment,
    pid         int             not null,
    qtext       varchar(255)    not null,
    qtime       int             not null,

    primary key (id),
    foreign key (pid) references user (id)
);

create table response (
    id          int             not null auto_increment,
    rid         int             not null,
    qid         int             not null,
    qtext       varchar(255)    not null,

    primary key (id),
    foreign key (rid) references user (id),
    foreign key (qid)  references question (id)
);

