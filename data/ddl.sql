create database rtql;

use rtql;

create table user (
    id          int             not null auto_increment,
    fname       varchar(50)     not null,
    lname       varchar(50)     not null,
    email       varchar(50)     not null,
    pass        varchar(50)     not null,

    constraint unique_user unique (fname, lname, email),
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
    foreign key (pid) references user (id) on delete cascade
);

create table response (
    id          int             not null auto_increment,
    qid         int             not null,
    snick       varchar(50)     not null,
    rtext       varchar(255)    not null,

    primary key (id),
    foreign key (qid)  references question (id) on delete cascade
);

