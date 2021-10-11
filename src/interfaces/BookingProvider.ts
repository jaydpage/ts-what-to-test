interface BookingProvider {
  makeBooking: (request: NewBookingRequest) => Promise<BookingSuccessResult>
}

interface BookingSuccessResult {
  id: string
  checkInTime: Date
  roomNumber: string
  price: number
}

interface NewBookingRequest {
  name: string
  idNumber: string
  checkIn: Date
  checkOut: Date
  numberOfGuests: number
  requestDate: Date
}
