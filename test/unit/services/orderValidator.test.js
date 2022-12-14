import orderValidator from "../../../src/services/orderValidator.js";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest.js";

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
  test("should fail an order with a negative accountId", () => {
    const negativeAccountId = -4;
    expect(orderValidator(negativeAccountId, validTicketTypeRequests)).toBe(
      false
    );
  });

  test("should fail an order with an accountId of 0", () => {
    const zeroAccountId = 0;
    expect(orderValidator(zeroAccountId, validTicketTypeRequests)).toBe(false);
  });

  test("should fail an order with zero tickets specified", () => {
    expect(orderValidator(validAccountId, [])).toBe(false);
  });

  test("should fail an order with all tickets specified at quantity zero", () => {
    const noTickets = [
      new TicketTypeRequest(adultTicketString, 0),
      new TicketTypeRequest(childTicketString, 0),
      new TicketTypeRequest(infantTicketString, 0),
    ];

    expect(orderValidator(validAccountId, noTickets)).toBe(false);
  });

  test("should fail an order when there are more infants than adults", () => {
    const moreInfantsThenAdults = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 0),
      new TicketTypeRequest(infantTicketString, 3),
    ];

    expect(orderValidator(validAccountId, moreInfantsThenAdults)).toBe(false);
  });

  test("should fail an order when there are over 20 tickets", () => {
    const tooManyTickets = [
      new TicketTypeRequest(adultTicketString, 10),
      new TicketTypeRequest(childTicketString, 10),
      new TicketTypeRequest(infantTicketString, 1),
    ];

    expect(orderValidator(validAccountId, tooManyTickets)).toBe(false);
  });

  test("should fail an order when there are no adults", () => {
    const noAdultsPresent = [
      new TicketTypeRequest(adultTicketString, 0),
      new TicketTypeRequest(childTicketString, 1),
      new TicketTypeRequest(infantTicketString, 0),
    ];

    expect(orderValidator(validAccountId, noAdultsPresent)).toBe(false);
  });

  test("should return true on a valid order", () => {
    expect(orderValidator(validAccountId, validTicketTypeRequests)).toBe(true);
  });

  test("should not require all ticket types", () => {
    const onlyAdults = [new TicketTypeRequest(adultTicketString, 5)];
    expect(orderValidator(validAccountId, onlyAdults)).toBe(true);
  });

  test("should not fail an order due to a very large accountId", () => {
    const largeAccountId = 1234567890;
    expect(orderValidator(largeAccountId, validTicketTypeRequests)).toBe(true);
  });

  test("should not fail an order due to exclusivley adults", () => {
    const allAdults = [new TicketTypeRequest(adultTicketString, 20)];
    expect(orderValidator(validAccountId, allAdults)).toBe(true);
  });

  test("should not fail an order due to mostly children", () => {
    const mostlyChildren = [
      new TicketTypeRequest(adultTicketString, 1),
      new TicketTypeRequest(childTicketString, 19),
    ];
    expect(orderValidator(validAccountId, mostlyChildren)).toBe(true);
  });

  test("should not fail an order due to even adults and infants", () => {
    const evenAdultsAndInfants = [
      new TicketTypeRequest(adultTicketString, 10),
      new TicketTypeRequest(infantTicketString, 10),
    ];
    expect(orderValidator(validAccountId, evenAdultsAndInfants)).toBe(true);
  });
});
