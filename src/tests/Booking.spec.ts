import { Booking } from '../Booking'
import { BookingRepository } from '../BookingRepository'
import { BookingRequest } from '../interfaces/BookingRequest'
import { Logger } from '../Logger'
import { NotificationService } from '../NotificationService'
import { RequestRepository } from '../RequestRepository'

describe('Booking', () => {
  describe('make', () => {
    it('saves the booking request', async () => {
      // Arrange
      const request = { ...defaultRequest }
      const requestRepository = new RequestRepository()
      jest.spyOn(requestRepository, 'save')

      const booking = createBooking(requestRepository)
      // Act
      await booking.make(request)
      // Assert
      expect(requestRepository.save).toBeCalledWith(request)
    })

    it('throws exception when saving booking request fails', async () => {
      // Arrange
      const requestRepository = new RequestRepository()

      const expectedRepoError = 'I am an error!'      
      const request = { ...defaultRequest }      
     
      jest.spyOn(requestRepository, 'save').mockRejectedValue(new Error(expectedRepoError))

      const booking = createBooking(requestRepository)

      // Act
      // Assert
      await expect(() => booking.make(request)).rejects.toThrowError(`Error occurred while trying to make booking: ${expectedRepoError}`)
    })

    function createBooking(requestRepository?: RequestRepository): Booking {
      requestRepository = requestRepository || new RequestRepository()

      const bookingRepository = new BookingRepository()
      const logger = new Logger()
      const notificationService = new NotificationService()

      const thirdPartyBookingProvider = { makeBooking: jest.fn() }

      return new Booking(requestRepository, bookingRepository, thirdPartyBookingProvider, notificationService, logger)
    }
  })

  const defaultRequest: BookingRequest = {
    name: 'billy bob',
    idNumber: '198431516516541',
    checkIn: new Date(),
    checkOut: new Date(),
    numberOfGuests: 1,
  }
})
