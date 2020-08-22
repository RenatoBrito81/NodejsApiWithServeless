const { ObjectID } = require("mongodb");
const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
    const { id } = req.params;
    console.log("id = " + id);

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    const Produtos = MongoClient.collection("produtos");
    const res = await Produtos.findOne({ _id: ObjectID(id) });

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res
    };
}