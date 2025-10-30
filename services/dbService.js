import { kMaxLength } from 'buffer';
import mysql from 'mysql2/promise';

// Create mysql instance
// Connect to mysql instance
// 

class DbQueries {

    // saf --> select * from
    // bid --> select * from where id = {id}
    // ins --> insert into {table} ... values ...
    // del --> delete from {table} where ...
    // come to think of it, if I just made these different classes that would probably be easier

    static SAF_USER = 'select * from rtql.user';
    static INS_USER = 'insert into rtql.user (fname, lname, email, pass) values (:fname, :lname, :email, :pass)';
    static UPD_USER = 'update rtql.user set fname = coalesce(:fname, fname), lname = coalesce(:lname, lname), email = coalesce(:email, email), pass = coalesce(:pass, pass) where id = :id';
    static BID_USER = 'select * from rtql.user where id = :id';
    static DEL_USER = 'delete from rtql.user where id = :id';

    static SAF_RESPONSE = 'select * from rtql.response';
    static INS_RESPONSE = 'insert into rtql.response (qid, snick, rtext) values (:qid, :snick, :rtext)';
    static BID_RESPONSE = 'select * from rtql.response where id = :id';

    static SAF_QUESTION = 'select * from rtql.question';
    static INS_QUESTION = 'insert into rtql.question (pid, qtext, qtime) values (:pid, :qtext, :qtime)';
    static BID_QUESTION = 'select * from rtql.question where id = :id';
}

export class DbService {
    static testResponse = [
        'res1', 'res2', 'res3', 'res4'
    ];

    static testQuestion = [
        'question1', 'question2', 'question3', 'question4'
    ];

    static cannotUpdate = (table, param) => `Cannot update without ${table} ${param}`;
    static cannotDelete = (table, param) => `Cannot update without ${table} ${param}`;

    constructor(logger, host, database, user, password) {
        this.logger     = logger;
        this.host       = host;
        this.database   = database;
        this.user       = user;
        this.password   = password;

        this.pool = mysql.createPool({
            host:       this.host,
            database:   this.database,
            user:       this.user,
            password:   this.password,
            namedPlaceholders: true
        });
    }

    async test() {
        return Promise.resolve('This is a test');
    }

    async getUser(id = null) {
        if (!id) {
            const [ results ] = await this.pool.execute(DbQueries.SAF_USER);

            console.log(results);

            return results;

        } else {
            const [ results ] = await this.pool.execute(DbQueries.BID_USER, { id: id });

            console.log(results);

            return results;
        }
    }

    async addUser(newUser) {
        if (!newUser) {
            throw new Error('No user to add.');
        } else {
            const [ results ] = await this.pool.execute(DbQueries.INS_USER, {
                fname: newUser.fname,
                lname: newUser.lname,
                email: newUser.email,
                pass: newUser.pass
            });

            console.log(results);

            return results;
        }
    }

    async updateUser(id, someUser) {
        if (!someUser)
            throw new Error(DbService.cannotUpdate('User', 'id'));
        else {
            console.log(someUser.fname || null);
            console.log(someUser.lname || null);

            const [ results ] = await this.pool.execute(DbQueries.UPD_USER, {
                id: id,
                fname: someUser.fname || null,
                lname: someUser.lname || null,
                email: someUser.email || null,
                pass:  someUser.pass || null
            });

            console.log(results);

            return results;
        }
    }

    async deleteUser(id) {
        if (!id)
            throw new Error(DbService.cannotDelete('User', 'id'))
        else {
            const [ results ] = await this.pool.execute(DbQueries.DEL_USER, {
                id: id
            });

            console.log(results);

            return results;
        }
    }

    async getResponse(id = null) {
        if (!id) {
            const [ results ] = await this.pool.execute(DbQueries.SAF_RESPONSE);

            console.log(results);

            return results;

        } else {
            const [ results ] = await this.pool.execute(DbQueries.BID_RESPONSE, {
                id: id
            });

            console.log(results);

            return results;
        }
    }

    async addResponse(newResponse) {
        if (!newResponse) 
            throw new Error('No new response to add');
        else {
            const [ results ] = await this.pool.execute(DbQueries.INS_RESPONSE, {
                qid: newResponse.qid,
                snick: newResponse.snick,
                rtext: newResponse.rtext 
            });

            console.log(results);

            return results;
        }
    }

    async getQuestion(id = null) {
        if (!id) {
            const [ results ] = await this.pool.execute(DbQueries.SAF_QUESTION);

            console.log(results);

            return results;
        } else {
            const [ results ] = await this.pool.execute(DbQueries.BID_QUESTION, {
                id: id
            });

            console.log(results);

            return results;
        }
    }

    async addQuestion(newQuestion) {
        if (!newQuestion)
            throw new Error('No new question to add');
        else {
            const [ results ] = await this.pool.execute(DbQueries.INS_QUESTION, {
                pid: newQuestion.pid,
                qtext: newQuestion.qtext,
                qtime: newQuestion.qtime
            });

            console.log(results);

            return results;
        }
    }
}
