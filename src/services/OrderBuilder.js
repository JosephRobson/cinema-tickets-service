import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";

export default function orderBuilder(tickets) {
  let orders = [];

  for (const [key, value] of Object.entries(tickets)) {
    orders.push(new TicketTypeRequest(key.toUpperCase(), value));
  }

  return orders;
}
