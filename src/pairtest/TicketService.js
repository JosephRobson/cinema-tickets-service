import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import OrderValidator from "./lib/order-validator/OrderValidator.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const isOrderValid = OrderValidator(accountId, ticketTypeRequests);

    if (isOrderValid) {
      // Pay for tickets
      const orderCost = ticketTypeRequests.reduce(
        (accumulator, ticket) => accumulator + ticket.getTicketCost(),
        0
      );
      new TicketPaymentService().makePayment(accountId, orderCost);

      // Reserve seats
      const orderSeats = ticketTypeRequests.reduce((accumulator, ticket) => {
        if (ticket.getTicketType() !== "INFANT") {
          return accumulator + ticket.getNoOfTickets();
        } else {
          return accumulator;
        }
      }, 0);
      new SeatReservationService().reserveSeat(accountId, orderSeats);
    } else {
      // TODO throw unique exception for each failed validation rule and reason, catch it here, and respond with unique error.
      throw new InvalidPurchaseException();
    }
  }
}
