-- create user 'service'@'localhost' identified by '12345'
-- create user 'student'@'localhost' identified by '1234';
-- create user 'teacher'@'localhost' identified by '4321';

create user 'service'@'localhost' identified by '12345';

grant select, insert, update, delete
    on all tables in schema compproject
    to service;


