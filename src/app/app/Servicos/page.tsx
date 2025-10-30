"use client";

import { useEffect, useState } from "react";
import {
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Search,
  X,
  SearchXIcon,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React from "react";
import {
  GetAllServices,
  CreateServices,
  ActiveService,
  DesactiveService,
  UpdateServices,
} from "./hooks";
import { Spinner } from "@/components/Shared/animation/isLoding";
import { ContextMenuLabel } from "@/components/ui/context-menu";

export type ServicoType = {
  id?: number;
  letra?: string;
  nome_servico: string;
  status: boolean;
};

export default function UserManagement() {
  const { data, isLoading } = GetAllServices();

  const active = ActiveService();
  const desactive = DesactiveService();

  const [users, setUsers] = useState<ServicoType[]>([
    {
      id: 1,
      nome_servico: "sdfsdfsdf",
      status: true,
    },
    {
      id: 2,
      nome_servico: "sdfsdfsdf",
      status: false,
    },
    {
      id: 1,
      nome_servico: "sdfsdfsdf",
      status: true,
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<ServicoType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ErrorSearch, setErrorSearch] = useState(false);

  const handleRemove = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setSelectedUser(null);
  };

  const [query, setQuery] = React.useState("");

  const filteredData:any[]= [,,,,,,,,]?.filter((item: any) =>
    Object.values(item)?.some((val) =>
      val?.toString()?.toLowerCase()?.includes(query?.toLowerCase())
    )
  );

  useEffect(() => {
    if (filteredData?.length == 0) {
      setErrorSearch(true);
    } else {
      setErrorSearch(false);
    }
  }, [filteredData]);

  return (
    <div className="flex flex-col w-full h-screen bg-zinc-100">
      <header className="flex bg-white max-md:px-6 px-4 items-center max-sm:justify-between max-sm:gap-2 max-md:justify-around justify-between border-b border-zinc-100 w-full h-[8%]">
        <div className="">
          <p className="text-[20px] max-sm:hidden max-md:text-[16px] font-bold ">
            Serviços
          </p>
          <p className="text-zinc-400 max-md:hidden text-[11px]">
            todos os Perfil de Serviços
          </p>
        </div>
        <div>
          <section className="flex h-[40px] max-md:w-[200px] w-[400px] px-3 p-1 rounded-md border items-center">
            <Search className="size-4 text-zinc-200" />
            <Input
              onChange={(e) => {
                setQuery(e?.target?.value);
              }}
              placeholder="pesquise os Perfil de Serviços"
              className={` ${
                ErrorSearch ? "text-red-700" : "text-black"
              } outline-none outline-0 border-none font-semibold text-[14px] h-[30px] placeholder:text-zinc-300`}
            />
          </section>
        </div>

        <div className="flex w-[20%] max-md:w-[40%]  justify-end">
          <div className="">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="">
                  <Plus className="mr-2 h-4 w-4" />
                  <p className="">Adicionar Serviço</p>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <AddForm />
              </SheetContent>
            </Sheet>
            <div></div>
          </div>
        </div>
      </header>

      <main className="w-full flex  h-full gap-2">
        <main className="w-full flex p-2 h-full ">
          <Card className="w-full h-[90%] overflow-hidden p-1">
            <CardContent className="w-full p-0">
              <ScrollArea className="w-full h-[80vh] p-0">
                <Table className="w-full p-0">
                  {isLoading ? (
                    <div className="w-full flex justify-center items-center h-[80vh] text-red-600 font-bold text-30">
                      <Spinner />
                    </div>
                  ) : filteredData?.length !== 0 ? (
                    <>
                      <TableHeader className="bg-gray-50 p-0">
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="max-md:hidden">
                            Opcoes
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData?.map((data) => (
                          <TableRow
                            key={data.id}
                            onClick={() => setSelectedUser(data)}
                            className="hover:bg-black rounded-[10px] hover:text-white cursor-pointer"
                          >
                            <TableCell className=" py-1 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>
                                    <Briefcase className="h-6 w-6 text-black" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">
                                    {data.letra}
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className=" py-1 whitespace-nowrap">
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  {data.nome_servico}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className=" py-1 whitespace-nowrap">
                              <div className="ml-4">
                                <div
                                  onClick={() => {
                                    console.log(data.status);

                                    if (data.status) {
                                      active.mutate(data?.id as any|number);
                                    } else if (data.status == null) {
                                      desactive.mutate(data?.id as any|number);
                                    }
                                  }}
                                  className="text-sm font-medium"
                                >
                                  {data.status ? "ACTIVO" : "DESATIVADO"}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="px-6 py-4 max-md:hidden whitespace-nowrap text-right text-sm font-medium">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemove(data.id as number)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>

                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-black  bg-white"
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                  </Button>
                                </SheetTrigger>
                                <SheetContent>
                                  <EditForm
                                    role={selectedUser as ServicoType}
                                  />
                                </SheetContent>
                              </Sheet>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  ) : (
                    <div className="w-full flex justify-center items-center h-[80vh] text-red-600 font-bold text-30">
                      <SearchXIcon />
                      {"Ups! nenhum dado encontrado.."}
                    </div>
                  )}
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </main>
    </div>
  );
}

function AddForm() {
  const form = useForm();

  const { mutate } = CreateServices();

  const handleSubmit = (e: any) => {
    mutate(e);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <SheetHeader>
        <SheetTitle>Adicionando Serviço</SheetTitle>
      </SheetHeader>
      <div>
        <Label htmlFor="nome_servico">Nome</Label>
        <Input id="nome_servico" {...form.register("nome_servico")} required />
      </div>

      <SheetClose>
        <Button type="submit" className="w-full">
          Adicionar
        </Button>
      </SheetClose>
    </form>
  );
}

function EditForm({ role }: { role: ServicoType }) {
  const [edited, setEdited] = useState<ServicoType>(role);
  const form = useForm();

  const handleSubmit = (e: any) => {
    console.log(e);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <SheetHeader>
        <SheetTitle>Editando Serviço</SheetTitle>
      </SheetHeader>
      <div>
        <Label>Nome</Label>
        <Input
          id="nome"
          value={edited.nome_servico}
          {...form.register("nome")}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        atualizar
      </Button>
    </form>
  );
}
