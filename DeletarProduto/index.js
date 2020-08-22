const { ObjectID } = require("mongodb");
const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
    const { id } = req.params;

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    const Produtos = MongoClient.collection("produtos");
    const res = await Produtos.findOneAndDelete({ _id: ObjectID(id) });

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res
    };
}