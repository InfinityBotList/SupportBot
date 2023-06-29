const mongo = require("mongoose");
const { log } = require("@plugins/logger/index");

const CONNECTION_SUCCESS_MESSAGE = "Connection established successfully";
const CONNECTION_ERROR_MESSAGE = "Connection failed";

module.exports.MongoClient = async({ connectionURL }) => {
    if (!connectionURL) {
        log("Invalid connection URL provided", {
            header: "MONGO_ERROR",
            type: "error",
        });
        return;
    }

    mongo.set("strictQuery", false);

    try {
        await mongo.connect(connectionURL, {
            family: 4,
            autoIndex: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000,
        });

        log(CONNECTION_SUCCESS_MESSAGE, {
            header: "MONGO_LOGS",
            type: "info",
        });
    } catch (error) {
        log(`${CONNECTION_ERROR_MESSAGE}: ${error.stack}`, {
            header: "MONGO_ERROR",
            type: "error",
        });
    }
};