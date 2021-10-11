export declare class BookingProvider {
  makeBooking: (request: NewBookingRequest) => Promise<BookingSuccessResult>
}

export interface BookingSuccessResult {
  id: string
  checkInTime: Date
  roomNumber: string
  price: number
}

export interface NewBookingRequest {
  name: string
  idNumber: string
  checkIn: Date
  checkOut: Date
  numberOfGuests: number
  requestDate: Date
}
