"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";

const PostData = async (data: any) => {
  try {
    const response = await api.post("/permission", data);
    toast(response?.data?.message, { className: "toast-success" });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar Permitions:", error);
    toast("Erro ao criar Permitions", { className: "toast-error" });
    throw error;
  }
};

export const CreatePermitions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => PostData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Permitions"] });
    },
  });
  return mutation;
};

const UpdateData = async (data: any) => {
  console.log(data);
  try {
    const response = await api.put("/permission/" + data?.id, data);
    console.log(response);
    toast(response?.data?.message, { className: "toast-success" });
    return response?.data;
  } catch (err) {
    console.log(err);
    toast("Houve um erro", { className: "toast-error" });
    throw err;
  }
};

export const UpdatePermitions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => UpdateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Permitions"] });
    },
  });
  return mutation;
};

const DeleteData = async (id: any) => {
  const response = await api.delete(`/permission/${id}`);
  toast(response?.data?.message, { className: "toast-success" });
  return response?.data;
};

export const DeletePermitions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => DeleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Permitions"] });
    },
  });
  return mutation;
};

const fetchData = async () => {
  const response = await api.get("/permission");
  return response?.data;
};

export const GetAllPermition = () => {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["Permitions"],
    retry: false,
    refetchInterval: 60 * 5 * 1000,
  });

  return {
    ...query,
    data: query.data,
  };
};
