const { MongoClient } = require("mongodb");
const config = {
    url: "mongodb://localhost/produtos?retryWrites=true&w=majority"
};

module.exports = () => new Promise((resolve, reject) => {
    MongoClient.connect(config.url, {useNewUrlParser: true}, (err, mongoConnection) => {
        if(!err){
            resolve({
                client: mongoConnection.db(config.dbName),
                closeConnectionFn: () => setTimeout(() => {
                    mongoConnection.close();
                }, 1000),
                mongoConnection,
            })
            console.log("Conectado com sucesso ao MongoDB.");            
        }
        else{
            console.log("Erro ao conectar no MongoDB.")
            reject(err);
        }
    });
});