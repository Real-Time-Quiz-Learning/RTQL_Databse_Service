import mysql from 'mysql2/promise';

// Create mysql instance
// Connect to mysql instance
// 

export class DbService {
    static testResponse = [
        'res1', 'res2', 'res3', 'res4'
    ];

    static testQuestion = [
        'question1', 'question2', 'question3', 'question4'
    ];

    static safUser      = 'select * from rtql.user';
    static safResponse  = 'select * from rtql.response';
    static safQuestion  = 'select * from rtql.question';

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
            password:   this.password
        });
    }

    async test() {
        return Promise.resolve('This is a test');
    }

    async getUser(id = null) {
        if (!id) {
            const [ results ] = this.pool.query();

        } else {
            const [ results ] = this.pool.query();
        }
    }

    async updateUser(id) {
        if (!id)
            throw new Error(DbService.cannotUpdate('User', 'id'));

        // Continue
    }

    async getResponse(id = null) {
        // return Promise.resolve(DbService.testResponse);
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
