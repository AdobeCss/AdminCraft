'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from '@/lib/axios';

const PostData = async (data: any) => {
  try {
    const response = await api.post("/services/create", data);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar services:", error);
    toast("Erro ao criar services", { className: "toast-error" });
    throw error;
  }
};

export const CreateServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => PostData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
  return mutation;
};

const UpdateData = async (data: any) => {
  console.log(data);
  try { 
    const response = await api.put("/services/"+data?.id, data);
    console.log(response);
    toast(response?.data?.message, { className: "toast-success" });
    return response?.data;
  } catch (err) {
    console.log(err)
    toast("Houve um erro", { className: "toast-error" });
    throw err; // Adicione isso para que o erro seja propagado
  }
};

export const UpdateServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => UpdateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
  return mutation;
};

const DeleteData = async (id: any) => {
  const response = await api.delete(`/services/${id}`);
  toast(response?.data?.message, { className: "toast-success" });
  return response?.data;
};

export const DeleteServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => DeleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
  return mutation;
};

const fetchData = async () => {
  const response = await api.get("/services/all");
  console.log(response.data)
  return response?.data;

};

export const GetAllServices = () => {
  const query = useQuery({
    queryFn: fetchData,
    queryKey:["services"],
    retry: false,
    refetchInterval: 60 * 5 * 1000,
  });

  return {
    ...query,
    data: query.data,
  };
};





const ActiveData = async (id: number) => {
  try {
    const response = await api.put("/services/enable/"+id);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar services:", error);
    toast("Erro ao criar services", { className: "toast-error" });
    throw error;
  }
};

export const ActiveService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id:number) => ActiveData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
  return mutation;
};


const DesactiveData = async (id: any) => {
  try {
    const response = await api.put("/services/disable/"+id);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar services:", error);
    toast("Erro ao criar services", { className: "toast-error" });
    throw error;
  }
};

export const DesactiveService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => DesactiveData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
  return mutation;
};