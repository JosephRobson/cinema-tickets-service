export default function seatCounter(ticketTypeRequests) {
  let seats = 0;
  ticketTypeRequests.forEach((ticket) => {
    switch (ticket.getTicketType()) {
      case "ADULT":
        seats += ticket.getNoOfTickets();
        break;
      case "CHILD":
        seats += ticket.getNoOfTickets();
        break;
    }
  });

  return seats;
}
