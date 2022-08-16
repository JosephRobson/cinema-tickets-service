import OrderBuilder from "../services/OrderBuilder.js";
import OrderValidator from "../services/orderValidator.js";
import SumOrderCost from "../services/orderCostCalculator.js";
import SeatCounter from "../services/seatCounter.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
const seatReservationService = new SeatReservationService();
const ticketPaymentService = new TicketPaymentService();

export default class TicketsController {
  async handlePostPurchase(req, res, next) {
    console.log(
      "Handling post request to the purchase endpoint with args: ",
      req.body.accountId,
      req.body.tickets
    );
    const accountId = req.body.accountId;

    const order = OrderBuilder(req.body.tickets);

    if (!OrderValidator(accountId, order)) {
      res.status(400).send();
    }

    const seatsRequired = SeatCounter(order);
    seatReservationService.reserveSeat(accountId, seatsRequired);

    const orderCost = SumOrderCost(order);
    ticketPaymentService.makePayment(accountId, orderCost);

    res.status(201).send();
  }
}
