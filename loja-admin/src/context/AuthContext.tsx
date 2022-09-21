import { getPropsWithDefaults, IconBase } from "@fluentui/react";
import { ICredential, IUser } from "@typesCustom";
import { createContext, ReactNode, useEffect, useState } from "react";
import { signInAdmin } from "../services/serve";

type AuthContextType = {
    user: IUser | undefined;
    signIn(credential: ICredential): void; 
    signOut(): void;
}
export const AuthContext = createContext<AuthContextType>({}as AuthContextType);

type AuthContextProviderProp = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProp ){
    const [user, setUser] = useState<IUser>();

    //Chave da local Storage
    const keyUser = '@PRM:user'

    useEffect{() => {

        //leio o usuario da local storage
        const storageUser = localStorage.getItem(keyUser);

        if(storageUser){
            setUser(JSON.parse(storageUser))
        }
    }, []};

    async function signIn(credential: ICredential){
        try {
            const result = await signInAdmin(credential) as any;

            if(result){
                setUser(result.user);

                //Gravar na localstorage o usuario 
                localStorage.setItem(keyUser, JSON.stringify(result.user));
            }

        } catch (error) {
            throw error;
        }
    }

    function sigmOut(){
        localStorage.removeItem(keyUser);
        setUser({ as IUser});
    }

    return(
        <AuthContext.Provider value={{user, signIn, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}