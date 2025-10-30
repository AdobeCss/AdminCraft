'use client'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertCircle, ArrowLeft, ArrowRight, ChartNoAxesCombinedIcon, Circle, Download, Edit, Filter, InfoIcon, LucideMenuSquare, Maximize, MenuSquare, PlusIcon, ProjectorIcon, RefreshCcw, Reply, Search, Settings, SquareActivity, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Users, UserPlus, Shield, Building, Briefcase, Ticket } from 'lucide-react'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from "recharts";
import { useState } from 'react';

export default function page() {


  const chartData = [
    { month: "Janeiro", Bilhetes: 186, mobile: 80,m:12 },
    { month: "Fevereiro", Bilhetes: 25, mobile: 20,m:24 },
    { month: "Março", Bilhetes: 237, mobile: 120 ,m:120},
    { month: "Abril", Bilhetes: 73, mobile: 190 ,m:12},
    { month: "Maio", Bilhetes: 130, mobile: 10 ,m:12},
    { month: "Junho", Bilhetes: 0, mobile: 110 ,m:12},
    { month: "Julho", Bilhetes: 117, mobile: 200 ,m:12},
    { month: "Agosto", Bilhetes: 190, mobile: 0 ,m:12},
    { month: "Setembro", Bilhetes: 140, mobile: 40 ,m:12},
    { month: "Outubro", Bilhetes: 140, mobile: 40 ,m:12},
    { month: "Novembro", Bilhetes: 190, mobile: 0 ,m:12},
    { month: "Desembro", Bilhetes: 110, mobile: 0 ,m:12},

]


  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig








    return(
        <>
     <main className='w-screen h-screen overflow-hidden rounded-lg bg-white'>
   
    <main className="flex w-full h-full">

      <main className="w-full h-full">
        <header className="flex px-4 items-center justify-between border-b border-zinc-100 w-full h-[8%]">
        
          <div className="">
            <p className="text-[18px] font-bold ">Dashboard</p>
            <p className="text-zinc-400 text-[11px]">Mweto dashboard</p>
          </div>

        </header>
   

        <main className="bg-zinc-50 w-full h-full p-2">


              <div className='flex w-full gap-4'>


                <Card className="w-[23%] flex flex-col items-center">
                  <div className="w-full mt-4 px-5 flex justify-between items-center">
                    <p className="text-[18px] font-bold">Total de Utilizadores</p>
                    <p className="text-[18px] font-bold">. . .</p>
                  </div>
                  <CardContent className="w-full mt-4">
                <p className="text-gray-300">Membros ativos</p>
                <div className="flex justify-between items-center">
                  <p className="text-[24px] font-bold">46,3%</p>
                  <p className="bg-green-100 rounded-sm text-green-600 p-1">+10%</p>
                </div>
                  </CardContent>
                </Card>

                <Card className="w-[23%] flex flex-col items-center">
                  <div className="w-full mt-4 px-5 flex justify-between items-center">
                    <p className="text-[18px] font-bold">Total de Postos</p>
                    <p className="text-[18px] font-bold">. . .</p>
                  </div>
                  <CardContent className="w-full mt-4">
                <p className="text-gray-300">postos ativos</p>
                <div className="flex justify-between items-center">
                  <p className="text-[24px] font-bold">46,3%</p>
                  <p className="bg-green-100 rounded-sm text-green-600 p-1">+10%</p>
                </div>
                  </CardContent>
                </Card>

                <Card className="w-[23%] flex flex-col items-center">
                  <div className="w-full mt-4 px-5 flex justify-between items-center">
                    <p className="text-[18px] font-bold">Total de Serviços</p>
                    <p className="text-[18px] font-bold">. . .</p>
                  </div>
                  <CardContent className="w-full mt-4">
                <p className="text-gray-300">Serviços ativos</p>
                <div className="flex justify-between items-center">
                  <p className="text-[24px] font-bold">46,3%</p>
                  <p className="bg-green-100 rounded-sm text-green-600 p-1">+10%</p>
                </div>
                  </CardContent>
                </Card>

                <Card className="w-[23%] flex flex-col items-center">
                  <div className="w-full mt-4 px-5 flex justify-between items-center">
                    <p className="text-[18px] font-bold">Total de Bilhetes</p>
                    <p className="text-[18px] font-bold">. . .</p>
                  </div>
                  <CardContent className="w-full mt-4">
                <p className="text-gray-300">Bilhetes criados</p>
                <div className="flex justify-between items-center">
                  <p className="text-[24px] font-bold">46,3%</p>
                  <p className="bg-green-100 rounded-sm text-green-600 p-1">+10%</p>
                </div>
                  </CardContent>
                </Card>

              </div>


              <Card className="w-full h-[40vh] mt-3 p-0">
                <CardHeader className="w-full flex justify-between items-center h-[65px] border-b border-gray-100 p-0">
                <div className="w-full flex justify-between items-center h-[65px] border-b border-gray-100 p-0">
             
                     <div className="w-[100%] p-3">


                    <p className="text-[18px] font-bold">Estatisticas relicionadas aos Bilhetes</p>
                    <p className="text-[14px] text-zinc-300">abaixoestao disponiveris os graficos relacionados a impressao dos bilhetes.</p>
                 
                 
                  </div>

                  <div className="w-[15%] flex items-center gap-1">
                      <Button className='text-[13px]'>
                        <Download className='size-4'/>
                        importar
                      </Button>
                      <Button className='text-[13px]'>
                        <Download className='size-4'/>
                      </Button>
                  </div>
                </div>

                </CardHeader>
               
             <CardContent className="w-full p-0 overflow-y-scroll "> 












             <main className="w-full flex  justify-">
                <div className="w-full h-[200px] p-2 flex justify-center  rounded-lg ">
                <ChartContainer  className="w-[100%]" config={chartConfig}>

             

<LineChart
accessibilityLayer

data={chartData}
margin={{
  top: 20,
  left: 12,
  right: 12,
}}
>
<CartesianGrid vertical={false} />
<XAxis
  dataKey="month"
  tickLine={false}
  axisLine={false}
  tickMargin={8}
  tickFormatter={(value) => value.slice(0, 3)}
/>
<ChartTooltip
  cursor={false}
  content={<ChartTooltipContent indicator="line" />}
/>
<Line
  dataKey="Bilhetes"
  // style={}
  type="natural"
  stroke="orange"
  className="shadow-[0px_0px_10px_black]"
  strokeWidth={3}
  dot={{
    fill: "orange",
  }}
  activeDot={{
    r: 6,
  }}

>
  <LabelList
    position="top"
    offset={12}
  className="fill-foreground shadow-2xl shadow-green-500"

    fontSize={12}
  />
</Line>
</LineChart>


</ChartContainer>



















                </div>
   {/* <div className="w-[33%] h-[300px] p-2  flex justify-center  rounded-lg ">

   <ChartContainer  className="w-[100%]" config={chartConfig}>
<RadarChart data={chartData}>
<ChartTooltip
  cursor={false}
  content={<ChartTooltipContent hideLabel />}
/>
<PolarGrid className="fill-[--color-desktop] opacity-20" />
<PolarAngleAxis dataKey="month" />
<Radar
  dataKey="desktop"
  fill="var(--color-desktop)"
  fillOpacity={0.5}
/>
</RadarChart>
</ChartContainer>
   </div> */}
            </main>







                  </CardContent> 

                </Card>




        </main>

      </main>



    </main>

     </main>
       
        </>
    )
    
}