'use client'

import "../globals.css";
import { useState,useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image';
import profilePic from '../../../public/logo.jpg'
import { Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

export const Spinner = () => (
  <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
);


export default function Login() {

    const { register, handleSubmit } =useForm()
    const { signIn } = useContext(AuthContext)  as AuthContextType

    const [loading, setLoading] = useState(false);
    const route=useRouter()
    async function handleSignIn(data: { email: string; password: string }) {
      setLoading(true);
      try {
        
       
        route.push("/app")

        toast("Usuario Verificado com sucesso", { className: "toast-info" })

      } catch (error) {
        console.log(error)
        toast("Ouve um erro ao verificar", { className: "toast-info" })
        console.error("Erro no login:", error)

      } finally {
        setLoading(false);
      }

    }

  return (
    <div className="flex items-center justify-center h-full bg-white w-full">
      <Card className="w-full border-none max-w-md">
        <CardHeader className="flex justify-center items-center pb-2">

  
      <p className='text-[40px] font-bold font-[Montserrat]'>Formater</p>

        </CardHeader>
        <CardContent className='border-none'>
          <form onSubmit={handleSubmit(handleSignIn)}  className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
                  <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                // className={errors.email ? 'border-red-500' : ''}
              />
            
              {/* {errors.email && (
                // <p className="text-sm text-red-500">{errors.email.message}</p>
              )} */}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                // className={errors.password ? 'border-red-500' : ''}
              />
              {/* {errors.password && (
                // <p className="text-sm text-red-500">{errors.password.message}</p>
              )} */}
            </div>
       
            <Button type="submit" className="w-full cursor-pointer" >
            {loading ? <Spinner className="mr-2" /> : null}
            {loading ? "Carregando..." : "Entrar"}
            </Button>
          </form>

          <div className="flex justify-center mt-6">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ----------   Esqueceu a sua senha?   --------------
              </a>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
