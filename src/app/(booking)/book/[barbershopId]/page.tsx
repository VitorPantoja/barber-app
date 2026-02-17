'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/booking.store'
import { ServiceSelector } from '@/components/booking/ServiceSelector'
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker'
import { GuestForm, GuestFormData } from '@/components/booking/GuestForm'
import { BookingSummary } from '@/components/booking/BookingSummary'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { api } from '@/lib/api-client'
import { useQuery, useMutation } from '@tanstack/react-query'

// Mock Data for MVP - Replace with API calls later
const MOCK_SERVICES = [
  { id: '1', name: 'Haircut', description: 'Standard haircut + wash', price: 45, durationMinutes: 30 },
  { id: '2', name: 'Beard Trim', description: 'Beard shaping + hot towel', price: 35, durationMinutes: 20 },
  { id: '3', name: 'Full Service', description: 'Haircut + Beard + Eyebrows', price: 75, durationMinutes: 50 },
]

const MOCK_SLOTS_MORNING = ['09:00', '09:30', '10:00', '10:30', '11:00']
const MOCK_SLOTS_AFTERNOON = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']

export default function BookingPage() {
  const params = useParams<{ barbershopId: string }>()
  const router = useRouter()
  
  const { 
    step, nextStep, prevStep, setStep,
    selectedServiceId, setService,
    selectedDate, setDate,
    selectedTimeSlot, setTimeSlot,
    reset
  } = useBookingStore()

  // Reset store on first load if it's a new booking
  useEffect(() => {
    // Optional: Logic to clear store if needed
  }, [])

  // 1. Fetch Services (Mocked for now)
  const services = MOCK_SERVICES

  // 2. Booking Mutation
  const bookMutation = useMutation({
    mutationFn: async (data: GuestFormData) => {
      // Simulate API call
      // return api.post('/bookings/guest', { ... })
      return new Promise((resolve) => setTimeout(resolve, 1500))
    },
    onSuccess: () => {
      reset()
      router.push('/dashboard/bookings') // Or a success page
    }
  })

  const currentService = services.find(s => s.id === selectedServiceId)

  const handleGuestSubmit = (data: GuestFormData) => {
    bookMutation.mutate(data)
  }

  // --- Render Steps ---

  const renderServiceStep = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select a Service</h2>
      <ServiceSelector 
        services={services}
        selectedId={selectedServiceId}
        onSelect={setService}
      />
      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} disabled={!selectedServiceId}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderDateTimeStep = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Date & Time</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={selectedDate || new Date()}
                onSelect={(date) => date && setDate(date)}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border"
            />
        </div>
        <div className="space-y-2">
            <h3 className="font-medium">Available Slots</h3>
            <TimeSlotPicker 
                slots={[...MOCK_SLOTS_MORNING, ...MOCK_SLOTS_AFTERNOON]}
                selectedSlot={selectedTimeSlot}
                onSelect={setTimeSlot}
            />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep} disabled={!selectedDate || !selectedTimeSlot}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderGuestFormStep = () => (
    <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Details</h2>
        <div className="grid gap-6 md:grid-cols-2">
            <GuestForm 
                onSubmit={handleGuestSubmit} 
                isSubmitting={bookMutation.isPending} 
            />
            
            {currentService && selectedDate && selectedTimeSlot && (
                <div className="md:pl-4">
                    <BookingSummary 
                        serviceName={currentService.name}
                        price={currentService.price}
                        date={selectedDate}
                        timeSlot={selectedTimeSlot}
                        barbershopName={`Barbershop #${params.barbershopId}`}
                    />
                </div>
            )}
        </div>
        <div className="flex justify-start pt-4">
            <Button variant="outline" onClick={prevStep} disabled={bookMutation.isPending}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
        </div>
    </div>
  )

  return (
    <Card className="w-full">
        <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Step {step} of 3</span>
                <span>Shop #{params.barbershopId}</span>
            </div>

            {step === 1 && renderServiceStep()}
            {step === 2 && renderDateTimeStep()}
            {step === 3 && renderGuestFormStep()}
        </CardContent>
    </Card>
  )
}
