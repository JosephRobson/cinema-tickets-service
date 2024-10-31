import { ValidateAccountId } from "./ValidationRules";

export default OrderValidator = (accountId, ...ticketTypeRequests) => {
  const result = ValidateAccountId(accountId);

  return result;
};
