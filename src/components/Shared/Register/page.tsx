'use client'

import { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateEnterprise } from './hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CompanyRegistrationDialog() {

  const create=CreateEnterprise()
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState(true)


  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ companyName,email , logo })
    
    console.log({ companyName})
    console.log(companyName)

    create.mutate({
      name:companyName,
      email:email,
      logo:logo,
    })
    
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Cadastro da Empresa</DialogTitle>
          <DialogDescription>
            Preencha os dados da sua empresa para continuar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logotipo</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logo')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Carregar Logotipo
                </Button>
                {logo && <span className="text-sm text-gray-500">{logo.name}</span>}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Cadastrar Empresa</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}