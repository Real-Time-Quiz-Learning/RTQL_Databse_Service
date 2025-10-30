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
    static INS_USER = 'insert into rtql.user (fname, lname, email) values (:fname, :lname, :email)';
    static BID_USER = 'select * from rtql.user where id = :id';

    static SAF_RESPONSE = 'select * from rtql.response';
    static INS_RESPONSE = 'insert into rtql.response (rid, pid, )';
    static BID_RESPONSE = 'select * from rtql.response where id = :id';

    static SAF_QUESTION = 'select * from rtql.question';
    static INS_QUESTION = 'insert int rtql.question ()'
}

export class DbService {
    static testResponse = [
        'res1', 'res2', 'res3', 'res4'
    ];

    static testQuestion = [
        'question1', 'question2', 'question3', 'question4'
    ];

    static cannotUpdate = (table, param) => `Cannot update without ${table} ${param}`;

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
            const [ results ] = this.pool.query();
        }
    }

    async addUser(newUser) {
        if (!newUser) {
            throw new Error('No user to add.');
        } else {
            const [ results ] = await this.pool.execute(DbQueries.INS_USER, {
                fname: newUser.fname,
                lname: newUser.lname,
                email: newUser.email
            });

            console.log(results);

            return results;
        }
    }

    async updateUser(id) {
        if (!id)
            throw new Error(DbService.cannotUpdate('User', 'id'));

        // Continue
    }

    async getResponse(id = null) {
        // return Promise.resolve(DbService.testResponse);

        console.log(id);

        if (!id) {
            const [ results ] = await this.pool.query(DbQueries.SAF_RESPONSE);

            console.log(results);

            return results;

        } else {

        }
    }

    async updateResponse(id) {
        if (!id)
            throw new Error(DbService.cannotUpdate('Response', 'id'));
        
        // Continue
    }

    async getQuestion(id = null) {
        // return Promise.resolve(DbService.testQuestion);
    }

    async updateQuestion(id) {
        if (!id)
            throw new Error(DbService.cannotUpdate('Question', 'id'));

        // Continue
    }
}
