import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GuestBookingState {
  step: number
  barbershopId: string | null
  selectedServiceId: string | null
  selectedDate: Date | null
  selectedTimeSlot: string | null
  guestToken: string | null // Temporary token after guest creation
  
  setBarbershopId: (id: string) => void
  setService: (serviceId: string) => void
  setDate: (date: Date) => void
  setTimeSlot: (slot: string) => void
  setGuestToken: (token: string) => void
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useBookingStore = create<GuestBookingState>()(
  persist(
    (set) => ({
      step: 1,
      barbershopId: null,
      selectedServiceId: null,
      selectedDate: null,
      selectedTimeSlot: null,
      guestToken: null,

      setBarbershopId: (id) => set({ barbershopId: id }),
      setService: (serviceId) => set({ selectedServiceId: serviceId }),
      setDate: (date) => set({ selectedDate: date }),
      setTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
      setGuestToken: (token) => set({ guestToken: token }),
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
      reset: () => set({
        step: 1,
        barbershopId: null,
        selectedServiceId: null,
        selectedDate: null,
        selectedTimeSlot: null,
        guestToken: null,
      }),
    }),
    {
      name: 'guest-booking-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for transient data
    }
  )
)
