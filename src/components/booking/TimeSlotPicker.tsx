'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TimeSlotPickerProps {
  slots: string[]
  selectedSlot: string | null
  onSelect: (slot: string) => void  
  isLoading?: boolean
}

export function TimeSlotPicker({ slots, selectedSlot, onSelect, isLoading }: TimeSlotPickerProps) {
  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading slots...</div>
  }

  if (slots.length === 0) {
    return <div className="text-center text-muted-foreground">No slots available for this date.</div>
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {slots.map((slot) => (
        <Button
          key={slot}
          variant={selectedSlot === slot ? "default" : "outline"}
          className={cn(
            "text-sm font-medium",
            selectedSlot === slot && "border-primary bg-primary text-primary-foreground"
          )}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </Button>
      ))}
    </div>
  )
}
