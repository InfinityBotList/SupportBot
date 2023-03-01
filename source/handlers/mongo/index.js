const mongo = require('mongoose');
const { log } = require("@plugins/logger/index");

module.exports.MongoClient = async({ connectionURL }) => {

    if (!connectionURL) return log(`Invalid connection url provided`, {
        header: "MONGO_ERROR",
        type: "error"
    });

    mongo.set('strictQuery', false);

    await mongo.connect(connectionURL, {
        family: 4,
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000
    }).then(() => {

        log('Connection established successfully', {
            header: 'MONGO_LOGS',
            type: 'info'
        });

    }).catch((e) => {

        log(`Connection failed: ${e.stack}`, {
            header: 'MONGO_ERROR',
            type: 'error'
        });
    });
}