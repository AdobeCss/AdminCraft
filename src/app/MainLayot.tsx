
'use client'

import { AuthContext, AuthProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from '../utils/providers';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import Login from "./Login/page"
import 'react-toastify/dist/ReactToastify.css';
import { AlertCircle, ArrowLeft, ArrowRight, ChartNoAxesCombinedIcon, Circle, Download, Edit, Filter, InfoIcon, LucideMenuSquare, Maximize, MenuSquare, PlusIcon, ProjectorIcon, RefreshCcw, Reply, Search, Settings, SquareActivity, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserPlus, Shield, Building, Briefcase, Ticket } from 'lucide-react'
import { ToastContainer } from "react-toastify";
import AsideBarComponent from "@/components/Shared/Aside";
import HeaderComponent from "@/components/Shared/Header";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const pathname = usePathname()
    const isLoginPage = pathname === '/Login';
    const isClinte = pathname === '/app/Bilheteria';
    const isAtendimento = pathname === '/app/Atendimento';
    const isEspera = pathname === '/app/Espera';


   

  return (
    <>
      <Provider>
          <AuthProvider>
           {
           isLoginPage==false?(
            <>
           
  <main className='w-screen h-screen overflow-hidden rounded-lg bg-white'>
           
           <HeaderComponent/>

       <main className="flex w-full h-full">
   
            <AsideBarComponent/>

            {children}

          

       </main>
   
        </main>
          

            </>
          )
      :<Login/>

      }
          </AuthProvider>
        </Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        </>
  );
}


