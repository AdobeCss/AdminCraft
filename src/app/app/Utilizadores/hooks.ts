'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from '@/lib/axios';

const PostData = async (data: any) => {
  try {
    const response = await api.post("/user", data);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar utilizador:", error);
    toast("Erro ao criar utilizador", { className: "toast-error" });
    throw error;
  }
};

export const CreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => PostData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["utilizador"] });
    },
  });
  return mutation;
};

const UpdateData = async (data: any) => {
  console.log(data);
  try { 
    const response = await api.put("/user/"+data?.id, data);
    console.log(response);
    toast(response?.data?.message, { className: "toast-success" });
    return response?.data;
  } catch (err) {
    console.log(err)
    toast("Houve um erro", { className: "toast-error" });
    throw err; // Adicione isso para que o erro seja propagado
  }
};

export const UpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => UpdateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["utilizador"] });
    },
  });
  return mutation;
};

const DeleteData = async (id: any) => {
  const response = await api.delete(`/user/${id}`);
  toast(response?.data?.message, { className: "toast-success" });
  return response?.data;
};

export const DeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => DeleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["utilizador"] });
    },
  });
  return mutation;
};

const fetchData = async () => {
  const response = await api.get("/user");
  return response?.data;
};

export const GetAllUser = () => {
  const query = useQuery({
    queryFn: fetchData,
    queryKey:["utilizador"],
    retry: false,
    refetchInterval: 60 * 5 * 1000,
  });

  return {
    ...query,
    data: query.data,
  };
};
