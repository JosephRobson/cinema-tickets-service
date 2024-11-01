import {
  ValidateAccountId,
  IsValidNumberOfTickets,
  IsAdultPresent,
  IsEnoughAdultsForInfants,
} from "./ValidationRules.js";

const OrderValidator = (accountId, ticketTypeRequests) => {
  return (
    ValidateAccountId(accountId) &&
    IsValidNumberOfTickets(ticketTypeRequests) &&
    IsAdultPresent(ticketTypeRequests) &&
    IsEnoughAdultsForInfants(ticketTypeRequests)
  );
};

export default OrderValidator;
