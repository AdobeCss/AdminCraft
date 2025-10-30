

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertCircle, ArrowLeft, ArrowRight, ChartNoAxesCombinedIcon, Circle, Download, Edit, Filter, InfoIcon, LogOut, LucideMenuSquare, Maximize, MenuSquare, PlusIcon, PowerOffIcon, ProjectorIcon, RefreshCcw, Reply, Search, Settings, SquareActivity, Trash2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserPlus, Shield, Building, Briefcase, Ticket } from 'lucide-react'
import { useContext, useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AuthContext, AuthContextType } from '@/context/AuthContext';
import { signOut } from '@/service/auth';
import RegisterEmterprise from '../Register/page';

export default function HeaderComponent() {

  const { user } = useContext(AuthContext)  as AuthContextType
const[enterprise,setEnterprise]=useState(true)

// useEffect(() => {
//   setEnterprise(user?.hasInstituicao)
// })


    return(
        <>

        {/* {
          enterprise?<></>:<RegisterEmterprise/>
        }
     */}
        <header className="flex w-full items-center p-1 justify-between border-b border-zinc-100 h-[30px]">
          <div className="flex px-2 gap-8">
            <div className="flex gap-2 items-center">
             Mweto system
            </div>


            <div className="flex items-center gap-4 max-md:hidden text-zinc-300 justify-between">
              <ArrowLeft className=" size-4"/>
              <ArrowRight className=" size-4 "/>
            </div>

          </div>
          <div className="w-[50%] flex items-center text-zinc-300 gap-2">
            <SquareActivity className=" size-4"/>
            <div className="flex w-[90%] items-center gap-2  bg-gray-100 rounded-sm px-1">
              <Input readOnly  className="w-full h-[25px] bg-gray-100 text-black text-[12px] border-none"/>
            <Reply className=" text-[12px]"/>
            </div>
 
          </div>
          <div className="flex gap-4 px-5 text-zinc-300">
              <InfoIcon className=" size-4"/>
              <PlusIcon className=" size-4"/>
              <Maximize className=" size-4"/>
          </div>

          <div className="flex gap-4 px-3 text-[12px] text-black">
          <Avatar className="h-5 w-5">
                  <AvatarFallback>
                       <User className="h-3 w-3 text-black" />
                    </AvatarFallback>
        </Avatar>
              <p >{user?.nome}</p>
              <Link href={'/Login'}>
              <Button className='h-6 w-4 bg-red-700 flex items-center justify-center text-white rounded-md' onClick={()=>{
                signOut()
              }}> 
               
                <LogOut className='text-white' size={20}/>
              </Button>
              </Link>
          </div>

        </header>





        <div className="w-full max-sm:h-[30px] max-sm:flex max-sm:justify-center h-[50px] p-1 max-md:flex hidden">

        <ul className="flex gap-1  text-[13px]">
          <li>
            <Link href="/app/Utilizadores" className="flex  max-sm:text-[11px] items-center hover:text-white max-sm:p-1 max-sm:space-x-1 space-x-2 p-2 rounded hover:bg-gray-700">
              <Users className="size-3 max-sm:hidden" />
              <span>Utilizadores</span>
            </Link>
          </li>
          <li>
            <Link href="/app/Roles" className="flex items-center max-sm:p-1 max-sm:text-[11px] max-sm:space-x-1 hover:text-white space-x-2 p-2 rounded hover:bg-gray-700">
              <UserPlus className="size-3 max-sm:hidden" />
              <span>Roles</span>
            </Link>
          </li>
          <li>
            <Link href="/app/Permitions" className="flex max-sm:p-1 max-sm:space-x-1  max-sm:text-[11px] items-center hover:text-white space-x-2 p-2 rounded hover:bg-gray-700">
              <Shield className="size-3 max-sm:hidden" />
              <span>Permissões</span>
            </Link>
          </li>
          <li>
            <Link href="/app/Postos" className="flex max-sm:p-1 max-sm:space-x-1 max-sm:text-[11px] items-center space-x-2 p-2 hover:text-white rounded hover:bg-gray-700">
              <Building className="size-3 max-sm:hidden" />
              <span>Postos</span>
            </Link>
          </li>
          <li>
            <Link href="/app/Servicos" className="flex max-sm:p-1 max-sm:space-x-1  max-sm:text-[11px] items-center space-x-2 p-2 hover:text-white rounded hover:bg-gray-700">
              <Briefcase className="size-3 max-sm:hidden" />
              <span>Serviços</span>
            </Link>
          </li>
          <li>
            <Link href="/app/Tiketes" className="flex max-sm:p-1 max-sm:space-x-1 max-sm:text-[11px] items-center space-x-2 p-2 hover:text-white rounded hover:bg-gray-700">
              <Ticket className="size-3 max-sm:hidden" />
              <span>Tickets</span>
            </Link>
          </li>
        </ul>
    </div>

        </>
    )
    
}