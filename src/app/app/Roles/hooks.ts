"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";

const PostData = async (data: any) => {
  try {
    const response = await api.post("/roles", data);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar roles:", error);
    toast("Erro ao criar roles", { className: "toast-error" });
    throw error;
  }
};

export const CreateRole = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => PostData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  return mutation;
};

const UpdateData = async (data: any) => {
  console.log(data);
  try {
    const response = await api.put("/roles/" + data?.id, data);
    console.log(response);
    toast(response?.data?.message, { className: "toast-success" });
    return response?.data;
  } catch (err) {
    console.log(err);
    toast("Houve um erro", { className: "toast-error" });
    throw err; // Adicione isso para que o erro seja propagado
  }
};

export const UpdateRole = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => UpdateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  return mutation;
};

const DeleteData = async (id: any) => {
  const response = await api.delete(`/roles/${id}`);
  toast(response?.data?.message, { className: "toast-success" });
  return response?.data;
};

export const DeleteRole = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => DeleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  return mutation;
};

const fetchData = async () => {
  const response = await api.get("/roles");
  return response?.data;
};

export const GetAllRole = () => {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["roles"],
    retry: false,
    refetchInterval: 60 * 5 * 1000,
  });

  return {
    ...query,
    data: query.data,
  };
};
