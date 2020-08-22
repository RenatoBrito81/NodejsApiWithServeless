const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    const Produtos = MongoClient.collection("produtos");
    const res = await Produtos.find({});

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res
    };
};