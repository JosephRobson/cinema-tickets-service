import { TicketValues } from "../../types/tickets.js";

export default function sumOrderCost(ticketTypeRequests) {
  let runningTotal = 0;
  ticketTypeRequests.forEach((ticket) => {
    runningTotal +=
      ticket.getNoOfTickets() * TicketValues[ticket.getTicketType()];
  });

  return runningTotal;
}
