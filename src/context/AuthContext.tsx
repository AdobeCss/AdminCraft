
'use client';



import { createContext, useEffect,ReactNode, useState } from 'react';
//import bcrypt from 'bcryptjs';_
import { SignInRequest ,recoverUserInformations} from '@/service/auth'
import { setCookie,parseCookies } from 'nookies'; // Importar setCookie ao invés de setCookies
import { useRouter } from 'next/navigation';
import { SignInDataRequest } from '../service/auth';
import { Criptograph } from '@/utils/cripto';

export type User = {
    id?:number;
    nome: string;
    email: string;
    hasInstituicao?:boolean;
};

export type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null; 
    signIn: (data:{email:string, password: string} ) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType|undefined>(undefined)
;

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    const router = useRouter(); 

    useEffect(() => {

        const {"nextauth.token_Mweto":token,"nextauth.id_Mweto":id}=parseCookies()
       
        if(token){
            recoverUserInformations(token,id).then(resp=>{ 
                setUser(resp.data)      
            })
        }

    })

    interface SignInDataLocal{
        hasInstituicao?:boolean;
        token:string
        user: {
            id: number,
            nome:string,
            email:string,
            senha:string,
            reset_senha: boolean,
            is_super_admin: boolean,
            activo: boolean
        }
    }
    
    async function SignIn({ email, password }: { email: string; password: string }) {
        const Data = await SignInRequest({ email, password });

        const data:SignInDataLocal=Data.data

        Criptograph('nextauth.token_Mweto',data.token)
        Criptograph('nextauth.id_Mweto',data.user.id.toString())

        setUser({
            nome: data.user.nome,
            email: data.user.email,
            hasInstituicao:data.hasInstituicao,
        })
        router.push('/app'); 

    }

    return (
        <AuthContext.Provider value={{ isAuthenticated:isAuthenticated, user:user, signIn:SignIn}}>
            {children}
        </AuthContext.Provider>
    );
}
