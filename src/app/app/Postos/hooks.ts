'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from '@/lib/axios';

const PostData = async (data: any) => {
  try {
    const response = await api.post("/posto/create", data);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar services:", error);
    toast("Erro ao criar services", { className: "toast-error" });
    throw error;
  }
};

export const CreatePostos = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => PostData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Postos"] });
    },
  });
  return mutation;
};

const UpdateData = async (data: any) => {
  console.log(data);
  try { 
    const response = await api.put("/posto/update/"+data?.id, data);
    toast(response?.data?.message, { className: "toast-success" });
    return response?.data;
  } catch (err) {
    console.log(err)
    toast("Houve um erro", { className: "toast-error" });
    throw err; // Adicione isso para que o erro seja propagado
  }
};

export const UpdatePostos = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => UpdateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Postos"] });
    },
  });
  return mutation;
};

const DeleteData = async (id: any) => {
  const response = await api.delete(`/posto/delete/${id}`);
  toast(response?.data?.message, { className: "toast-success" });
  return response?.data;
};

export const DeletePostos = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => DeleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Postos"] });
    },
  });
  return mutation;
};

const fetchData = async () => {
  const response = await api.get("/posto/list");
  console.log(response.data?.dados)
  return response?.data?.dados;

};

export const GetAllPostos = () => {
  const query = useQuery({
    queryFn: fetchData,
    queryKey:["Postos"],
    retry: false,
    refetchInterval: 60 * 5 * 1000,
  });

  return {
    ...query,
    data: query.data,
  };
};




