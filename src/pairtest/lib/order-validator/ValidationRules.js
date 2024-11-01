import TicketTypeRequest from "../TicketTypeRequest";

const ValidateAccountId = (accountId) => {
  return typeof accountId === "number" && accountId > 0;
};

const IsValidNumberOfTickets = (ticketTypeRequests) => {
  const totalTickets = ticketTypeRequests.reduce(
    (accumulator, ticket) => accumulator + ticket.getNoOfTickets(),
    0
  );

  return totalTickets > 0 && totalTickets <= 25;
};

const IsAdultPresent = (ticketTypeRequests) => {
  // TODO parameterise ticket keys and costs into 'type' object
  const adultTickets = ticketTypeRequests.find(
    (ticketTypeRequest) => ticketTypeRequest.getTicketType() === "ADULT"
  );

  return adultTickets !== undefined;
};

const IsEnoughAdultsForInfants = (ticketTypeRequests) => {
  let adultSeats, infantSeats;
  ticketTypeRequests.forEach((ticketTypeRequest) => {
    switch (ticketTypeRequest.getTicketType()) {
      case "ADULT":
        adultSeats = ticketTypeRequest.getNoOfTickets();
        break;

      case "INFANT":
        infantSeats = ticketTypeRequest.getNoOfTickets();
        break;
    }
  });

  // Although business rules do not explicitly state how many infants could fit on an adult's lap, we assume 1:1 is the limit
  return adultSeats >= infantSeats;
};

export {
  ValidateAccountId,
  IsValidNumberOfTickets,
  IsAdultPresent,
  IsEnoughAdultsForInfants,
};
