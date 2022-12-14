import express  from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import router from './router';

//Instancio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = 3300;

//Middleware
app.use(cors());
app.use(express.json());

//importa as rotas
app.use('/server',router)

//Tendo conectar ao bancoe, se não conseguir, mostre o erro.
AppDataSource.initialize()
    .then(() => {

    //Inicio da aplicação
    app.listen(PORT, () => {
        console.log(`Running in port ${PORT}`);
        
    })

}).catch(error => {
    console.log('Ops! Ocorreu um erro.');
    console.error(error);
});



