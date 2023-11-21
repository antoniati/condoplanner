/*
    Função de conexão com MongoDB essencial para garantir uma única instância 
    de conexão com o MongoDB, promovendo a reutilização e evitando 
    a criação excessiva de conexões desnecessárias.
*/

// Importa a biblioteca Mongoose para facilitar a interação com o MongoDB.
import mongoose from "mongoose";
 
/*
    Esta função gerencia a conexão com o banco de dados MongoDB.
    Se uma conexão já existe (estado 1), a função retorna a promessa da conexão existente.
    Caso contrário, a função cria uma nova conexão usando a URI fornecida pelas variáveis de ambiente.
*/
const connectionWithMongoDB = () => {
    // Verifica o estado da conexão atual do Mongoose.
    if (mongoose.connection.readyState === 1) {
        // Se já está conectado, retorna a promessa da conexão existente.
        return mongoose.connection.asPromise();
    } else {
        // Caso contrário, obtém a URI de conexão a partir das variáveis de ambiente.
        const uri = process.env.MONGODB_URI;

        // Inicia uma nova conexão com o MongoDB usando a URI obtida.
        return mongoose.connect(uri);
    };
};

// Exporta a função "connectionWithMongoDB" para que possa ser utilizada em outras partes do aplicativo.
export default connectionWithMongoDB;
