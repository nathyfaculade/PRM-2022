import axios, { AxiosError}from "axios";
import { ICredential } from "@typesCustom";

const api  = axios.create({
    baseURL: 'http://localhost:3300'
})

//Endpoint dos serviços
const _ACCOUNT = '/account/admin';

//Accont
const signInAdmin = async (credential: ICredential) => {
    try {
        const result = await api.post('${_ACCOUNT}/singin', credential);

        return new Promise(resolve => {
            resolve(result.data);
        });
    } catch (e) {
        const error = e as AxiosError;  

        return new Promise(resolve => {
            resolve(error.response?.data);
        });

        console.log("Deu ruim: ", e);
    }
}

export{ signInAdmin }