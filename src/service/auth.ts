
import { destroyCookie } from "nookies";
import { api } from "../lib/axios";
import { Descriptograh } from "@/utils/cripto";

export interface SignInDataRequest {
  data: {
    message: string
    status: boolean
    userlogin: {
      email: string
      id: number
      is_admin: boolean
      name: string
      refreshToken: string
      token: string
    }
  }
}

export const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function SignInRequest(data:{email:string,password:string}) {

  await delay(1);

 const Data=api.post("/login", data)
 return Data

}

export async function recoverUserInformations() {

  await delay();

 const id_= Descriptograh("nextauth.id_Mweto") as string
 const token_= Descriptograh("nextauth.token_Mweto") as string

 
 const Data= api.get("/user/find-by-id/"+id_)

 return Data

}

export function signOut(){

  destroyCookie(null,'nextauth.id_Mweto',{path:'/'})
  destroyCookie(null,'nextauth.token_Mweto',{path:'/'})

}
