-- create user 'service'@'localhost' identified by '12345'
create user 'student'@'localhost' identified by '1234';
create user 'teacher'@'localhost' identified by '4321';

grant select, insert, delete
    on table, compproject.questions to user student;

