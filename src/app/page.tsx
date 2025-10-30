import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Menu, Bell, UserCircle, Search, Edit, Trash2, UserPlus } from 'lucide-react'
import Provider from '../utils/providers';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <>
<Provider>
      <p>ijoiojiij</p>
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
  )
}