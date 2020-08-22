//Referência ao módulo de conexão com o mongodb
const createMongoClient = require("../shared/mongoClient");

//Função da rota para criar um produto
module.exports = async function (context, req) {
    //Determina os dados do produto  enviado na requisição
    const produto = req.body;

    //Referência a conexão com o mongodb
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    //Referência ao documento de produtos
    const Produtos = MongoClient.collection("produtos");

    //Faz a inclusão do produto
    const res = await Produtos.insert(produto);

    //Fecha a conexão com o mongodb
    closeConnectionFn();

    //Retorna que foi incluso com sucesso
    context.res = {
        status: 201,
        body: res
    };
}