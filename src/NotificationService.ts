import { ConfirmedBooking } from "./interfaces/ConfirmedBooking";

export class NotificationService {
  async send(booking: ConfirmedBooking): Promise<void> {}
}
