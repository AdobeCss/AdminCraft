"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function InputSelectSearch() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedFramework, setSelectedFramework] = React.useState("")

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-[300px] space-y-4">
      <Input
        type="text"
        placeholder="Search frameworks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select value={selectedFramework} onValueChange={setSelectedFramework}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frameworks</SelectLabel>
            {filteredFrameworks.map((framework) => (
              <SelectItem key={framework.value} value={framework.value}>
                {framework.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedFramework && (
        <p className="text-sm text-gray-500">
          Selected: {frameworks.find(f => f.value === selectedFramework)?.label}
        </p>
      )}
    </div>
  )
}