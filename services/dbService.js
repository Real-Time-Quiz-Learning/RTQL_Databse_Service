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

    static SAF_USER = 'select (fname,lname,email) from rtql.user';
    static INS_USER = 'insert into rtql.user (fname, lname, email, pass) values (:fname, :lname, :email, :pass)';
    static UPD_USER = 'update rtql.user set fname = coalesce(:fname, fname), lname = coalesce(:lname, lname), email = coalesce(:email, email), pass = coalesce(:pass, pass) where id = :id';
    static BID_USER = 'select * from rtql.user where id = :id';
    static DEL_USER = 'delete from rtql.user where id = :id';

    static SAF_RESPONSE = 'select * from rtql.response';
    static INS_RESPONSE = 'insert into rtql.response (qid, snick, rtext) values (:qid, :snick, :rtext)';
    static BID_RESPONSE = 'select * from rtql.response where id = :id';

    static SAF_QUESTION = 'select * from rtql.question';
    static INS_QUESTION = 'insert into rtql.question (pid, qtext, qtime) values (:pid, :qtext, :qtime)';
    static UPD_QUESTION = 'update rtql.question set qtext = coalesce(:qtext, qtext)'
    static BID_QUESTION = 'select * from rtql.question where id = :id';
}

export class DbResStatus {
    static SUCCESS = 'SUCCESS';
    static ERROR = 'ERROR';
}

export class DbRes {
    constructor(status, data = null, error = null) {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}

class Entity {
    expectedParams() {
        return Object.getOwnPropertyNames(this);
    }
}

// export class User extends Entity {
//     constructor(fname = null, lname = null, email = null, pass = null) {
//         this.fname = fname;
//         this.lname = lname;
//         this.email = email;
//         this.pass = pass;
//     }
// }

// export class Question extends Entity {
//     constructor(pid = null, qtext = null, qtime = null) {
//         this.pid = pid;
//         this.qtext = qtext;
//         this.qtime = qtime;
//     }
// }

// export class Response extends Entity {
//     constructor(qid = null, rtext = null, snick = null) {
//         this.qid = qid;
//         this.rtext = rtext;
//         this.snick = snick;
//     }
// }
// This seems like a good idea but shall be avoided for the meantime

export class DbService {

    static DB_QUERY_FAILED      = 'database query failed';
    static DB_QUERY_SUCCESS     = 'database query success';
    static DB_MISSING_ID        = 'id parameter not specified, nothing to do';
    static DB_NOTHING_UPDATE    = 'nothing to update';

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

    async executeQuery(qstring, qparams) {
        try {
            const [ results ] = await this.pool.execute(qstring, qparams);
            console.log(results);
            return new DbRes(DbResStatus.SUCCESS, results);
        } catch (err) {
            return new DbRes(DbResStatus.ERROR, null, err);
        }
    }

    // --- User ----------------------------------------

    async getUser(id = null) {
        if (!id) {
            const results = await this.executeQuery(DbQueries.SAF_USER);
            return results;
        } else {
            const results = await this.executeQuery(DbQueries.BID_USER, {
                id: id
            });
            return results;
        }
    }

    async addUser(newUser) {
        if (!newUser) {
            return new DbRes(DbResStatus.ERROR, null, DB_NOTHING_UPDATE);
        } else {
            const results = await this.executeQuery(DbQueries.INS_USER, {
                fname: newUser.fname,
                lname: newUser.lname,
                email: newUser.email,
                pass: newUser.pass
            });
            return results;
        }
    }

    async updateUser(id, someUser) {
        if (!someUser)
            return new DbRes(DbResStatus.ERROR, null, DB_NOTHING_UPDATE);
        else {
            const results = await this.executeQuery(DbQueries.UPD_USER, {
                id: id,
                fname: someUser.fname   || null,
                lname: someUser.lname   || null,
                email: someUser.email   || null,
                pass:  someUser.pass    || null
            });
            return results;
        }
    }

    async deleteUser(id) {
        if (!id)
            return new DbRes(DbResStatus.ERROR, null, DB_MISSING_ID);
        else {
            const results = await this.executeQuery(DbQueries.DEL_USER, {
                id: id
            });
            return results;
        }
    }

    // --- Response ----------------------------------------

    async getResponse(id = null) {
        if (!id) {
            const results = await this.executeQuery(DbQueries.SAF_RESPONSE);
            return results;
        } else {
            const results = await this.executeQuery(DbQueries.BID_RESPONSE, {
                id: id
            });
            return results;
        }
    }

    async addResponse(newResponse) {
        if (!newResponse) 
            return new DbRes(DbResStatus.ERROR);
        else {
            const results = await this.executeQuery(DbQueries.INS_RESPONSE, {
                qid: newResponse.qid,
                snick: newResponse.snick,
                rtext: newResponse.rtext 
            });
            return results;
        }
    }

    // --- Question ----------------------------------------

    async getQuestion(id = null) {
        if (!id) {
            const results = await this.executeQuery(DbQueries.SAF_QUESTION);
            return results;
        } else {
            const results = await this.executeQuery(DbQueries.BID_QUESTION, {
                id: id
            });
            return results;
        }
    }

    async addQuestion(newQuestion) {
        if (!newQuestion)
            return new DbRes(DbResStatus.ERROR, null, DB_NOTHING_UPDATE);
        else {
            const results = await this.executeQuery(DbQueries.INS_QUESTION, {
                pid: newQuestion.pid,
                qtext: newQuestion.qtext,
                qtime: newQuestion.qtime
            });
            return results;
        }
    }

    async updateQuestion(id, someQuestion) {
        if (!someQuestion)
            return new DbRes(DbResStatus.ERROR, null, DB_NOTHING_UPDATE)
        else {
            const results = await this.executeQuery(DbQueries.UPD_QUESTION, {
                id: id, 
                qtext: someQuestion.qtext || null
            });
            return results;
        }
    }
}
