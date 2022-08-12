import { OrderValidator } from "../../src/middleware/orderValidator.js";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";
import { TicketValues } from "../../types/tickets.js";

const adultTicketString = "ADULT";
const childTicketString = "CHILD";
const infantTicketString = "INFANT";

const validAccountId = 123;
const validTicketTypeRequests = [
  new TicketTypeRequest(adultTicketString, 2),
  new TicketTypeRequest(childTicketString, 1),
  new TicketTypeRequest(infantTicketString, 1),
];

describe("Order Validator", () => {
  // Failure Cases

  test("should fail an order with a negative accountId", () => {
    const negativeAccountId = -4;
    expect(OrderValidator(negativeAccountId, validTicketTypeRequests)).toBe(
      false
    );
  });

  test("should fail an order with an accountId of 0", () => {
    const zeroAccountId = 0;
    expect(OrderValidator(zeroAccountId, validTicketTypeRequests)).toBe(false);
  });

  test("should fail an order with zero tickets specified", () => {
    expect(OrderValidator(validAccountId, [])).toBe(false);
  });

  test("should fail an order with all tickets specified at quantity zero", () => {
    const noTickets = [
      new TicketTypeRequest(adultTicketString, 0),
      new TicketTypeRequest(childTicketString, 0),
      new TicketTypeRequest(infantTicketString, 0),
    ];

    expect(OrderValidator(validAccountId, noTickets)).toBe(false);
  });

  test("should fail an order when there are more infants than adults", () => {
    const moreInfantsThenAdults = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 0),
      new TicketTypeRequest(infantTicketString, 3),
    ];

    expect(OrderValidator(validAccountId, moreInfantsThenAdults)).toBe(false);
  });

  test("should fail an order when there are over 20 tickets", () => {
    const tooManyTickets = [
      new TicketTypeRequest(adultTicketString, 10),
      new TicketTypeRequest(childTicketString, 10),
      new TicketTypeRequest(infantTicketString, 1),
    ];

    expect(OrderValidator(validAccountId, tooManyTickets)).toBe(false);
  });

  test("should fail an order when there are no adults", () => {
    const noAdultsPresent = [
      new TicketTypeRequest(adultTicketString, 0),
      new TicketTypeRequest(childTicketString, 1),
      new TicketTypeRequest(infantTicketString, 0),
    ];

    expect(OrderValidator(validAccountId, noAdultsPresent)).toBe(false);
  });

  // Success cases
  test("should return true on a valid order", () => {
    expect(OrderValidator(validAccountId, validTicketTypeRequests)).toBe(true);
  });

  test("should not require all ticket types", () => {
    const onlyAdults = [new TicketTypeRequest(adultTicketString, 5)];
    expect(OrderValidator(validAccountId, onlyAdults)).toBe(true);
  });

  test("should not fail an order due to a very large accountId", () => {
    const largeAccountId = 1234567890;
    expect(OrderValidator(largeAccountId, validTicketTypeRequests)).toBe(true);
  });

  test("should not fail an order due to exclusivley adults", () => {
    const allAdults = [new TicketTypeRequest(adultTicketString, 20)];
    expect(OrderValidator(validAccountId, allAdults)).toBe(true);
  });

  test("should not fail an order due to mostly children", () => {
    const mostlyChildren = [
      new TicketTypeRequest(adultTicketString, 1),
      new TicketTypeRequest(childTicketString, 19),
    ];
    expect(OrderValidator(validAccountId, mostlyChildren)).toBe(true);
  });

  test("should not fail an order due to even adults and infants", () => {
    const evenAdultsAndInfants = [
      new TicketTypeRequest(adultTicketString, 10),
      new TicketTypeRequest(infantTicketString, 10),
    ];
    expect(OrderValidator(validAccountId, evenAdultsAndInfants)).toBe(true);
  });
});
