

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertCircle, ArrowLeft, ArrowRight, ChartNoAxesCombinedIcon, Circle, Download, Edit, EyeIcon, Filter, InfoIcon, LayoutDashboard, LockOpen, LucideMenuSquare, Maximize, MenuSquare, PlusIcon, Printer, ProjectorIcon, RefreshCcw, Reply, Search, Settings, SquareActivity, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserPlus, Shield, Building, Briefcase, Ticket,TvMinimal } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AsideBarComponent() {

    return(
        <>

      <aside className="w-[250px] border-r border-zinc-100 h-screen max-md:hidden">
        <header className="px-3 py-2 border-b flex justify-between h-[7.2%] items-center border-zinc-100">
          <h1 className='text-[24px] font-bold uppercase'>Logo</h1>
          <Printer className=" size-6"/>
        </header>
        <div className="p-2">
        <section className="flex h-[40px] bg p-1 rounded-md border items-center">
              <Search className="text-zinc-300 size-6 text-[12px]"/>
              <Input placeholder="Pesquisar itens" className="border-none h-[38px] text-[12px] placeholder:text-zinc-300"/>
            </section>


<Tabs>
<TabsList defaultValue={"10"} className="w-full h-screen bg-white p-1">
  
    


        <ul className="space-y-2 w-full h-full ">
        <li>

<TabsTrigger
    className="bg-white data-[state=active]:text-white  data-[state=active]:bg-gray-700 w-full"
    value="10"
  >
  <Link href="/app" className="flex items-center hover:text-white space-x-2 p-2 rounded hover:bg-gray-700">
    <LayoutDashboard className="h-5 w-5" />
    <span>Dashboard</span>
  </Link>
</TabsTrigger>

</li>
          <li>

          <TabsTrigger
              className="bg-white data-[state=active]:text-white  data-[state=active]:bg-gray-700 w-full"
              value="1"
            >
            <Link href="/app/Utilizadores" className="flex items-center hover:text-white space-x-2 p-2 rounded hover:bg-gray-700">
              <Users className="h-5 w-5" />
              <span>Utilizadores</span>
            </Link>
          </TabsTrigger>

          </li>
          <li>
          <TabsTrigger
              className="bg-white data-[state=active]:text-white   data-[state=active]:bg-gray-700"
              value="2"
            >
            <Link href="/app/Roles" className="flex items-center  hover:text-white space-x-2 p-2 rounded hover:bg-gray-700">
              <UserPlus className="h-5 w-5" />
              <span>Perfis</span>
            </Link>
            </TabsTrigger>
          </li>
      
          <li>
          <TabsTrigger
              className="bg-white data-[state=active]:text-white   data-[state=active]:bg-gray-700"
              value="4"
            >
            <Link href="/app/Postos" className="flex items-center space-x-2 p-2 hover:text-white rounded hover:bg-gray-700">
              <Building className="h-5 w-5" />
              <span>Postos</span>
            </Link>
            </TabsTrigger>

          </li>
          <li>
          <TabsTrigger
              className="bg-white data-[state=active]:text-white   data-[state=active]:bg-gray-700"
              value="5"
            >
            <Link href="/app/Servicos" className="flex items-center space-x-2 p-2 hover:text-white rounded hover:bg-gray-700">
              <Briefcase className="h-5 w-5" />
              <span>Serviços</span>
            </Link>
            </TabsTrigger>

          </li>
       

        </ul>


  </TabsList>
</Tabs>

        </div>

      </aside>

        </>
    )
    
}