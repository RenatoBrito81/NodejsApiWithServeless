const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
    const produto = req.body;

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    const Produtos = MongoClient.collection("produtos");
    const res = await Produtos.insert(produto);

    closeConnectionFn();

    context.res = {
        status: 201,
        body: res
    };
}