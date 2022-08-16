export default function orderValidator(accountId, ticketTypeRequests) {
  return (
    ValidateAccountId(accountId) &&
    CheckPresenceOfAdult(ticketTypeRequests) &&
    CheckInfantsDoesNotExceedAdults(ticketTypeRequests) &&
    CheckTicketsDontExceedMaximum(ticketTypeRequests)
  );
}

// An account ID is considered valid if it is greater than 0
function ValidateAccountId(accountId) {
  return accountId > 0;
  // Possible attack vector if end user is able to find out which account IDs are valid.
  // As it stands with the current rules, we are only checking for a non-negative ID however
  // we could also feasibly check if an account is extant here, or check funds for validation.
  // In which case a bad actor would be able to identify account details from our responses.
}

// Returns true if valid number of adult tickets present
// No Children or Infants can have tickets without an adult,
// ergo each order must contain at least one adult
function CheckPresenceOfAdult(ticketTypeRequests) {
  const adultTicket = ticketTypeRequests.find((ticketTypeRequest) => {
    if (ticketTypeRequest.getTicketType() === "ADULT") {
      return true;
    }
  });

  // If no adult tickets have been found or there is 0 or fewer adult tickets, the order is invalid
  return adultTicket?.getNoOfTickets() >= 1;
}

// Although the spec does not explicitly specify a 1:1 adults to infants
// ratio, a valid order would be 1 adult and 19 infants in 1 seat.
function CheckInfantsDoesNotExceedAdults(ticketTypeRequests) {
  const infantTickets = ticketTypeRequests.find((ticketTypeRequest) => {
    if (ticketTypeRequest.getTicketType() === "INFANT") {
      return true;
    }
  });

  const adultTicket = ticketTypeRequests.find((ticketTypeRequest) => {
    if (ticketTypeRequest.getTicketType() === "ADULT") {
      return true;
    }
  });

  // If adult tickets match or exceed infant tickets, order is not invalidated.
  return (
    (infantTickets?.getNoOfTickets() ?? 0) <= adultTicket?.getNoOfTickets()
  );
}

// Returns true if tickets do not exceed 20
function CheckTicketsDontExceedMaximum(ticketTypeRequests) {
  const maximumTicketsPerOrder = 20;
  const totalNumberOfTickets = ticketTypeRequests.reduce(
    (total, tickets) => total + tickets.getNoOfTickets(),
    0
  );

  return totalNumberOfTickets <= maximumTicketsPerOrder;
}
