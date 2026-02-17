'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, Scissors } from 'lucide-react'
import { format } from 'date-fns'

interface BookingSummaryProps {
  serviceName: string
  price: number
  date: Date
  timeSlot: string
  barbershopName: string
}

export function BookingSummary({ serviceName, price, date, timeSlot, barbershopName }: BookingSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Scissors className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Service</p>
            <p className="text-muted-foreground">{serviceName}</p>
          </div>
          <div className="ml-auto font-semibold">
            R$ {price.toFixed(2)}
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Date</p>
            <p className="text-muted-foreground">{format(date, 'MMMM d, yyyy')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Time</p>
            <p className="text-muted-foreground">{timeSlot}</p>
          </div>
        </div>

        <Separator />
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="font-semibold">{barbershopName}</p>
        </div>
      </CardContent>
    </Card>
  )
}
