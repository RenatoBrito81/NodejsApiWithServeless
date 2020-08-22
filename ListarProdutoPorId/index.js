//Referência ao módulo de conexão com o mongodb
const createMongoClient = require("../shared/mongoClient");

//Referência ao tipo ObjectID do mongodb
const { ObjectID } = require("mongodb");

//Função da rota para listar um produto pelo id
module.exports = async function (context, req) {
    //Determina o id enviado na requisição
    const { id } = req.params;

    //Referência a conexão com o mongodb
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    //Referência ao documento de produtos
    const Produtos = MongoClient.collection("produtos");

    //Faz a pesquisa do produto através do id
    const res = await Produtos.findOne({ _id: ObjectID(id) });

    //Fecha a conexão com o mongodb
    closeConnectionFn();

    //Retorna o produto encontrado
    context.res = {
        status: 200,
        body: res
    };
}