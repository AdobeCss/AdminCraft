'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from '@/lib/axios';

const PostData = async (data: any) => {
  try {

    console.log(data.logo)

    console.log(data);

    const response = await api.post("/instituicao",{
      name:data.name,
      email:data.email,
    },
  )
  console.log(response?.data)

  const formData = new FormData();
  formData.append('logo', data.logo)


  const response_ = await api.put("/instituicao/update-logo/"+response?.data.dados.id,
    formData,{
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }
)
  console.log(response_?.data)


    toast(response?.data?.message, { className: "toast-success" });
    console.error(response?.data?.message);
    return response.data;
  } catch (error) {
    console.error(error);
    toast("Erro ao criar services", { className: "toast-error" });
    throw error;
  }
};

export const CreateEnterprise = () => {
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
    throw err;
  }
};
