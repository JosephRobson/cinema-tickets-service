import orderBuilder from "../services/orderBuilder.js";
import orderValidator from "../services/orderValidator.js";
import sumOrderCost from "../services/orderCostCalculator.js";
import seatCounter from "../services/seatCounter.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
const seatReservationService = new SeatReservationService();
const ticketPaymentService = new TicketPaymentService();

export const purchaseTickets = (req, res, next) => {
  console.log(
    "Handling post request to the purchase endpoint with args: ",
    req.body.accountId,
    req.body.tickets
  );
  const accountId = req?.body?.accountId;

  const order = orderBuilder(req.body.tickets);

  if (!orderValidator(accountId, order)) {
    const error = new Error("failed");
    error.status = 400;
    return next(error);
  }

  try {
    const seatsRequired = seatCounter(order);
    seatReservationService.reserveSeat(accountId, seatsRequired);

    const orderCost = sumOrderCost(order);
    ticketPaymentService.makePayment(accountId, orderCost);
  } catch (error) {
    console.error(error);
    return next(error);
  }

  res.status(201).send();
};
