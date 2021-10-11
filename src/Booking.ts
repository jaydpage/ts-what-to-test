import { BookingRepository } from './BookingRepository'
import { BookingProvider, BookingSuccessResult, NewBookingRequest } from './interfaces/BookingProvider'
import { BookingRequest } from './interfaces/BookingRequest'
import { ConfirmedBooking } from './interfaces/ConfirmedBooking'
import { Logger } from './Logger'
import { NotificationService } from './NotificationService'
import { RequestRepository } from './RequestRepository'

export class Booking {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly bookingRepository: BookingRepository,
    private readonly thirdPartyBookingProvider: BookingProvider,
    private readonly notificationService: NotificationService,
    private readonly logger: Logger,
  ) {}

  async make(bookingRequest: BookingRequest): Promise<ConfirmedBooking> {
    try {
      await this.persistRequest(bookingRequest)

      const bookingResult = await this.registerBooking(bookingRequest)
      const confirmedBooking = { ...bookingRequest, ...bookingResult }

      await this.persistBooking(confirmedBooking)
      await this.sendNotification(confirmedBooking)

      return confirmedBooking
    } catch (e : any) {
      const errorMessage = `Error occurred while trying to make booking: ${e.message}`
      this.logger.error(errorMessage)
      throw Error(errorMessage)
    }
  }

  private async persistRequest(bookingRequest: BookingRequest) {
    await this.requestRepository.save(bookingRequest)
  }

  private async registerBooking(bookingRequest: BookingRequest): Promise<BookingSuccessResult> {
    const request: NewBookingRequest = {
      ...bookingRequest,
      requestDate: new Date(),
    }
    return await this.thirdPartyBookingProvider.makeBooking(request)
  }

  private async persistBooking(confirmedBooking: ConfirmedBooking) {
    await this.bookingRepository.save(confirmedBooking)
  }

  private async sendNotification(confirmedBooking: ConfirmedBooking) {
    await this.notificationService.send(confirmedBooking)
  }
}
