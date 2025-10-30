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
  Shield,
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
import { GetAllRole, CreateRole, DeleteRole, UpdateRole } from "./hooks";
import { GetAllPermition } from "./HooksPermition";
import { Spinner } from "@/components/Shared/animation/isLoding";
import { ContextMenuLabel } from "@/components/ui/context-menu";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";

export type RoleType = {
  id?: number;
  nome: string;
  descricao: string;
  estado?: boolean;
};

export default function UserManagement() {
  const { data, isLoading } = GetAllRole();
  const { mutate } = DeleteRole();
  const [users, setUsers] = useState<RoleType[]>(data);
  const [selectedUser, setSelectedUser] = useState<RoleType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ErrorSearch, setErrorSearch] = useState(false);

  const handleRemove = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setSelectedUser(null);
  };

  const [query, setQuery] = React.useState("");

  const filteredData: RoleType[] = [,,,,,,,,]?.filter((item: any) =>
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
            Perfil de utilizadores
          </p>
          <p className="text-zinc-400 max-md:hidden text-[11px]">
            todos os Perfil de utilizadores
          </p>
        </div>
        <div>
          <section className="flex h-[40px] max-md:w-[200px] w-[400px] px-3 p-1 rounded-md border items-center">
            <Search className="size-4 text-zinc-200" />
            <Input
              onChange={(e) => {
                setQuery(e?.target?.value);
              }}
              placeholder="pesquise os Perfil de utilizadores"
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
                  <p className="">Adicionar Perfil</p>
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
                          <TableHead className="max-md:hidden">
                            Descricao
                          </TableHead>
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
                                    <User className="h-6 w-6 text-black" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">
                                    {data.id}
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className=" py-1 whitespace-nowrap">
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  {data.nome}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm ">
                              {data.descricao}
                            </TableCell>

                            <TableCell className="px-6 py-4 max-md:hidden whitespace-nowrap text-right text-sm font-medium">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => mutate(data.id as number)}
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
                                  <EditForm role={selectedUser as RoleType} />
                                </SheetContent>
                              </Sheet>

                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronRight className="h-4 w-4 mr-2" />{" "}
                                    Permissions
                                  </Button>
                                </SheetTrigger>
                                <SheetContent className="min-w-[60%]">
                                  <Permitions ID={data.id as number} />
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

  const { mutate } = CreateRole();

  const handleSubmit = (e: any) => {
    mutate(e);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <SheetHeader>
        <SheetTitle>Adicionando Utilizador</SheetTitle>
      </SheetHeader>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="nome" {...form.register("nome")} required />
      </div>

      <div>
        <Label htmlFor="email">descricao</Label>
        <Input
          id="descricao"
          type="descricao"
          {...form.register("descricao")}
          required
        />
      </div>

      <SheetClose>
        <Button type="submit" className="w-full">
          Adicionar
        </Button>
      </SheetClose>
    </form>
  );
}

function EditForm({ role }: { role: RoleType }) {
  const [edited, setEdited] = useState<RoleType>(role);
  const form = useForm();

  const { mutate } = UpdateRole();

  const handleSubmit = (e: any) => {
    e["id"] = role.id;
    mutate(e);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <SheetHeader>
        <SheetTitle>Editando </SheetTitle>
      </SheetHeader>
      <div>
        <Label>Nome</Label>
        <Input
          id="nome"
          defaultValue={edited.nome}
          {...form.register("nome")}
          required
        />
      </div>
      <div>
        <Label htmlFor="edit-email">descricao</Label>
        <Input
          id="descricao"
          defaultValue={edited.descricao}
          {...form.register("descricao")}
          required
        />
      </div>

      <SheetClose>
        <Button type="submit" className="w-full">
          atualizar
        </Button>
      </SheetClose>
    </form>
  );
}

function Permitions({ ID }: { ID: number }) {
  const { data } = GetAllPermition();

  const form = useForm();

  const handleSubmit = (e: any) => {
    console.log(e);
    form.reset();
  };

  const [selectedUser, setSelectedUser] = useState<RoleType | null>(null);
  const [ErrorSearch, setErrorSearch] = useState(false);

  const [AllPermitions_, set_AllPermitions_] = React.useState<RoleType[]>([]);
  const [Perfil, setPerfil] = React.useState([]);
  const [All_Permitions, set_All_Permitions] = React.useState([]);
  const [filterPermintions, setfilterPermintions] = React.useState<RoleType[]>(
    []
  );
  const [filterPermintionsFalse, setfilterPermintionsFalse] = React.useState<
    RoleType[]
  >([]);

  const mergeAndReplaceDuplicates = (array1: any, array2: any, key: any) => {
    const map = new Map();

    array1?.forEach((item: any) => {
      map.set(item[key], item);
    });
    array2?.forEach((item: any) => {
      if (!map.has(item[key])) {
        map.set(item[key], item);
      }
    });
    return Array.from(map.values());
  };

  const filterUniqueByKey = (array: any, key: any) => {
    const seen = new Set();
    return array?.filter((item: any) => {
      const value = item[key];
      if (seen?.has(value)) {
        return false;
      } else {
        seen?.add(value);
        return true;
      }
    });
  };

  React.useEffect(() => {
    function onLoad() {
      api
        .get("/rolesPermission/find-roles-permission/" + ID)
        .then((response) => {
          const Data_: RoleType[] = response.data as RoleType[];

          set_AllPermitions_(Data_);

          api
            .get("/permission")
            .then((response) => {
              const Data = response.data;

              set_All_Permitions(Data);

              for (let i = 0; i < Data.length; i++) {
                Data_?.forEach((e: RoleType) => {
                  if (Data[i].id === e.id) {
                    setfilterPermintions((e) => [
                      ...e,
                      {
                        descricao: Data[i].descricao,
                        nome: Data[i].nome,
                        id: Data[i].id,
                        estado: true,
                      },
                    ]);
                  } else {
                    setfilterPermintionsFalse((e) => [
                      ...e,
                      {
                        descricao: Data[i].desc,
                        nome: Data[i].nome,
                        id: Data[i].id,
                        estado: false,
                      },
                    ]);
                  }
                });
              }
            })
            .catch((err) => {
              set_All_Permitions([]);
            });
        })
        .catch((err) => {
          set_All_Permitions([]);
        });
    }

    onLoad();
  }, []);

  const uniquePeople = filterUniqueByKey(filterPermintions, "nome");
  const falseArrayUnique = filterUniqueByKey(filterPermintionsFalse, "nome");
  const All = mergeAndReplaceDuplicates(uniquePeople, falseArrayUnique, "nome");

  const [query, setQuery] = React.useState("");

  const filteredData: RoleType[] = All?.filter((item: any) =>
    Object.values(item)?.some((val) =>
      val?.toString()?.toLowerCase()?.includes(query?.toLowerCase())
    )
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="flex flex-col w-full h-screen bg-zinc-100">
        <header className="flex bg-white max-md:px-6 px-4 items-center max-sm:justify-between max-sm:gap-2 max-md:justify-around justify-between border-b border-zinc-100 w-full h-[8%]">
          <div className="">
            <p className="text-[20px] max-sm:hidden max-md:text-[16px] font-bold ">
              Permissões
            </p>
            <p className="text-zinc-400 max-md:hidden text-[11px]">
              todos as Permissões
            </p>
          </div>
          <div>
            <section className="flex h-[40px] max-md:w-[200px] w-[400px] px-3 p-1 rounded-md border items-center">
              <Search className="size-4 text-zinc-200" />
              <Input
                onChange={(e) => {
                  setQuery(e?.target?.value);
                }}
                placeholder="pesquise os Perfil de Permissões"
                className={` ${
                  ErrorSearch ? "text-red-700" : "text-black"
                } outline-none outline-0 border-none font-semibold text-[14px] h-[30px] placeholder:text-zinc-300`}
              />
            </section>
          </div>
        </header>

        <main className="w-full flex  h-full gap-2">
          <main className="w-full flex p-2 h-full ">
            <Card className="w-full h-[90%] overflow-hidden p-1">
              <CardContent className="w-full p-0">
                <ScrollArea className="w-full h-[80vh] p-0">
                  <Table className="w-full p-0">
                    {All.length !== 0 ? (
                      filteredData?.length !== 0 ? (
                        <>
                          <TableHeader className="bg-gray-50 p-0">
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Nome</TableHead>
                              <TableHead className="max-md:hidden">
                                Descricao
                              </TableHead>
                              <TableHead className="max-md:hidden">
                                Opcoes
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredData.map((data) => (
                              <TableRow
                                key={data.id}
                                onClick={() => setSelectedUser(data)}
                                className="hover:bg-black rounded-[10px] hover:text-white cursor-pointer"
                              >
                                <TableCell className=" py-1 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Avatar className="h-10 w-10">
                                      <AvatarFallback>
                                        <Shield className="h-6 w-6 text-black" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium">
                                        {data.id}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell className=" py-1 whitespace-nowrap">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">
                                      {data.nome}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm ">
                                  {data.descricao}
                                </TableCell>

                                <TableCell className="px-6 py-4 max-md:hidden whitespace-nowrap text-right text-sm font-medium">
                                  <Switch
                                    checked={data.estado}
                                    onCheckedChange={() => {
                                      if (data?.estado == false)
                                        api
                                          .post(
                                            "rolesPermission/add-roles-permission",
                                            {
                                              id_role: Number(ID),
                                              id_permission: Number(data.id),
                                            }
                                          )
                                          .then((response) => {
                                            toast(response?.data?.message, {
                                              className: "toast-success",
                                            });
                                            // setRefresh((e) => e + 1);
                                          })
                                          .catch((err) => {
                                            toast(err.response?.data?.message, {
                                              className: "toast-err",
                                            });
                                          });
                                      else
                                        api
                                          .delete(
                                            "rolesPermission/delete-roles-permission/" +
                                              ID +
                                              "/" +
                                              data.id
                                          )
                                          .then((response) => {
                                            toast(response?.data?.message, {
                                              className: "toast-success",
                                            });
                                            toast(response?.data?.message, {
                                              className: "toast-success",
                                            });
                                          })
                                          .catch((err) => {
                                            toast(err.response?.data?.message, {
                                              className: "toast-err",
                                            });
                                          });
                                    }}
                                    className="data-[state=checked]:bg-blue-600"
                                  />
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
                      )
                    ) : (
                      <>
                        <TableHeader className="bg-gray-50 p-0">
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead className="max-md:hidden">
                              Descricao
                            </TableHead>
                            <TableHead className="max-md:hidden">
                              Opcoes
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.map((data: RoleType) => (
                            <TableRow
                              key={data.id}
                              onClick={() => setSelectedUser(data)}
                              className="hover:bg-black rounded-[10px] hover:text-white cursor-pointer"
                            >
                              <TableCell className=" py-1 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                      <Shield className="h-6 w-6 text-black" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">
                                      {data.id}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className=" py-1 whitespace-nowrap">
                                <div className="ml-4">
                                  <div className="text-sm font-medium">
                                    {data.nome}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="px-6 py-4 whitespace-nowrap text-sm ">
                                {data.descricao}
                              </TableCell>

                              <TableCell className="px-6 py-4 max-md:hidden whitespace-nowrap text-right text-sm font-medium">
                                <Switch
                                  checked={data.estado}
                                  onCheckedChange={() => {
                                    api
                                      .post(
                                        "rolesPermission/add-roles-permission",
                                        {
                                          id_role: Number(ID),
                                          id_permission: Number(data.id),
                                        }
                                      )
                                      .then((response) => {
                                        toast(response?.data?.message, {
                                          className: "toast-success",
                                        });
                                        // setRefresh((e) => e + 1);
                                      })
                                      .catch((err) => {
                                        toast(err.response?.data?.message, {
                                          className: "toast-err",
                                        });
                                      });
                                  }}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    )}
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </main>
        </main>
      </div>
    </form>
  );
}
