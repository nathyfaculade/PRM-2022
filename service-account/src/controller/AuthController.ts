import { ICredential, IUser } from '@typesCustom';
import { FirebaseError, signInAdmin} from '../services/firebase'
import e, { Request, Response } from 'express';

class AuthController{

    public async signInAdmin(request: Request, response: Response ) {
        const credential = request.body;

        try {
            
            const result = await signInAdmin(credential.email, credential.password);

            const user: IUser = {
                uid: result.user.uid,
                name: result.user.displayName ||  '',
                email: result.user.email || credential.email
            }

            const accessToken = await result.user.getIdToken();
            
            return response.json({user, token: accessToken})

        } catch (e) {
            const error = e as FirebaseError;

            ///Sem indentificar o e-mail
            if(error.code === 'auth/missing-email'){
                return response.status(400).json({message: 'É preciso informar um e-mail'});
            }

            //Usuário não se encontra
            if(error.code === 'auth/user-not-found'){
                return response.status(400).json({message: 'Usuário não encontrado'});
            }

            //Senha incorreta
            if(error.code === 'auth/wrong-password'){
                return response.status(400).json({message: 'A senha está incorreta'});
            }

            return response.status(500).json(error.message)
        }
    }

}

export default new AuthController();