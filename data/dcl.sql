-- create user 'service'@'localhost' identified by '12345'
-- create user 'student'@'localhost' identified by '1234';
-- create user 'teacher'@'localhost' identified by '4321';

create user 'rtql_service'@'localhost' identified by 'vbN&*1:_+';

grant select, insert, update, delete
    on rtql.*
    to 'rtql_service'@'localhost';
