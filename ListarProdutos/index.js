//Referência ao módulo de conexão com o mongodb
const createMongoClient = require("../shared/mongoClient");

//Função da rota para listar todos os produtos
module.exports = async function (context, req) {
    //Referência a conexão com o mongodb
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    //Referência ao documento de produtos
    const Produtos = MongoClient.collection("produtos");

    //Faz a pesquisa de todos os produtos
    const res = await Produtos.find({});

    //Converte o retorno em array
    const body = await res.toArray();

    //Fecha a conexão com o mongodb
    closeConnectionFn();

    //Retorna os produtos encontrados
    context.res = {
        status: 200,
        body: body
    };
};