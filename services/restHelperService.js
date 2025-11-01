export class RestHelper {

    statusFromDbRes(dbRes) {
        return (dbRes.status === 'SUCCESS')
            ? 200
            : (dbRes.status === 'ERROR') ? 400 : 500;
    }

    send(res, dbRes, message, status = null) {
        console.log(dbRes);
        console.log(dbRes.status);
        res.status(status || this.statusFromDbRes(dbRes));
        message.response = dbRes;
        res.json(message);
    }
}