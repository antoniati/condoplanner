// Importa a conexão com o MongoDB.
import clientPromise from "@/config/mongodb";

// Importa o adaptador MongoDB para o NextAuth.
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// Importa o NextAuth e o provedor Google.
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configurações para autenticação com NextAuth e MongoDB.
export const authOptions = {
    // Configura os provedores de autenticação, neste caso, apenas o Google.
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    // Utiliza o adaptador MongoDB para armazenar dados de sessão e usuários autenticados.
    adapter: MongoDBAdapter(clientPromise),

    // Chave secreta usada para assinar cookies e tokens de sessão.
    secret: process.env.SERVER_KEY_SECRET
}

// Exporta o objeto de configuração como uma instância do NextAuth.
export default NextAuth(authOptions)
