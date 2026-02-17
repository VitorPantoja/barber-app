'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Service {
  id: string
  name: string
  description: string
  price: number
  durationMinutes: number
}

interface ServiceSelectorProps {
  services: Service[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ServiceSelector({ services, selectedId, onSelect }: ServiceSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => (
        <div
          key={service.id}
          className={cn(
            "relative flex cursor-pointer rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary",
            selectedId === service.id && "border-primary ring-1 ring-primary"
          )}
          onClick={() => onSelect(service.id)}
        >
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-medium">
              <span>R$ {service.price.toFixed(2)}</span>
              <span className="text-muted-foreground">•</span>
              <span>{service.durationMinutes} min</span>
            </div>
          </div>
          {selectedId === service.id && (
            <div className="absolute right-3 top-3 text-primary">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
