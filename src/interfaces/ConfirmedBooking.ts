export interface ConfirmedBooking {
  id: string
  name: string
  idNumber: string
  checkIn: Date
  checkOut: Date
  checkInTime: Date
  numberOfGuests: number
  roomNumber: string
  price: number
}
