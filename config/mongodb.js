/* 
    Esta abordagem de conexão foi retirada de: 
    https://github.com/vercel/next.js/tree/canary/examples/with-mongodb 
*/ 

// Importa o módulo MongoClient da biblioteca "mongodb".
import { MongoClient } from "mongodb" 

// Verifica se a variável de ambiente "MONGODB_URI" está definida.
if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// Obtém o valor da variável de ambiente "MONGODB_URI" que contém a URL de conexão com o MongoDB.
const uri = process.env.MONGODB_URI

// Define um objeto com valores iniciais vazio para as opções de conexão com MongoDB.
const options = {}

// Declara variáveis para o cliente MongoDB e a promessa de conexão.
let client;
let clientPromise;

// Verifica se o ambiente é "development".
if (process.env.NODE_ENV === "development") {
    // No modo de desenvolvimento, é utilizado uma variável global para que o valor
    // seja preservado durante recargas de módulo causadas por HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // No modo de produção, é melhor não usar uma variável global.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Exporta uma promessa MongoClient com escopo de módulo. Ao fazer isso em um
// módulo separado, o cliente pode ser compartilhado entre funções.
export default clientPromise;