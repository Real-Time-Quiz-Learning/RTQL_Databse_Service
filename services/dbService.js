
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

    constructor(logger, database, user, password) {
        this.logger     = logger;
        this.database   = database;
        this.user       = user;
        this.password   = password;
    }

    async test() {
        return Promise.resolve('This is a test');
    }

    async getResponse() {
        return Promise.resolve(DbService.testResponse);
    }

    async updateResponse() {
    }

    async getQuestion() {
        return Promise.resolve(DbService.testQuestion);
    }

    async updateQuestion() {
    }
}
