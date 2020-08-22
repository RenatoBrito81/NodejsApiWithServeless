//Referência ao módulo de conexão com o mongodb
const createMongoClient = require("../shared/mongoClient");

//Referência ao tipo ObjectID do mongodb
const { ObjectID } = require("mongodb");

//Função da rota para atualizar um produto pelo id
module.exports = async function (context, req) {
    //Determina o id enviado na requisição
    const { id } = req.params;

    //Determina os dados do produto  enviado na requisição
    const produto = req.body;

    //Referência a conexão com o mongodb
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();

    //Referência ao documento de produtos
    const Produtos = MongoClient.collection("produtos");

    //Faz a atualização do produto através do id
    const res = await Produtos.findOneAndUpdate(
        { _id: ObjectID(id) }, 
        { $set: produto } 
    );

    //Fecha a conexão com o mongodb
    closeConnectionFn();

    //Retorna que foi atualizado com sucesso
    context.res = {
        status: 200,
        body: res
    };
}