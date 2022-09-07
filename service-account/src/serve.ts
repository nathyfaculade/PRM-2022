import express  from 'express';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';


//Carrego as variaveis de ambiente da aplicação 
dotenv.config();

//Instancio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = process.env.PORT || 3302;

//Middleware
app.use(cors());
app.use(express.json());

//importa as rotas
app.use('/account',router)


//Inicio da aplicação
app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
})




