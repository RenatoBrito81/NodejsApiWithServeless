//Referência a biblioteca do mongodb
const { MongoClient } = require("mongodb");

//Configurações de conexão com o mongodb
const config = {
    url: "mongodb://localhost/produtos?retryWrites=true&w=majority&useUnifiedTopology=true"
};

//Promise para fazer a conexão com o mongodb
module.exports = () => new Promise((resolve, reject) => {
    //Método para conectar ao mongodb
    MongoClient.connect(config.url, {useNewUrlParser: true}, (err, mongoConnection) => {
        //Verifica se não houve erro na conexão com o mongodb
        if(!err){
            console.log("Conectado com sucesso ao MongoDB.");            

            //Retorna a conexão com sucesso
            resolve({
                client: mongoConnection.db(config.dbName),
                closeConnectionFn: () => setTimeout(() => {
                    mongoConnection.close();
                }, 1000),
                mongoConnection,
            })
            
        }
        else{
            console.log("Erro ao conectar no MongoDB.")

            //Retorna o erro da conexão
            reject(err);
        }
    });
});