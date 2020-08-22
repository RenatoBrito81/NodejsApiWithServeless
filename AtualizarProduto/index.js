const { ObjectID } = require("mongodb");
const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
    const { id } = req.params;
    const produto = req.body;

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    const Produtos = MongoClient.collection("produtos");
    const res = await Produtos.findOneAndUpdate(
        { _id: ObjectID(id) }, 
        { $set: produto } 
    );

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res
    };
}