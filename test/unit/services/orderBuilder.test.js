import OrderBuilder from "../../../src/services/orderBuilder.js";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest.js";

const adultTicketString = "ADULT";
const childTicketString = "CHILD";
const infantTicketString = "INFANT";

describe("Order Builder", () => {
  test("should build the correct order given all types of tickets", () => {
    const order = { adult: 2, child: 2, infant: 1 };
    const expectedResponse = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 2),
      new TicketTypeRequest(infantTicketString, 1),
    ];

    expect(OrderBuilder(order)).toStrictEqual(expectedResponse);
  });

  test("should build the correct order given only adults present", () => {
    const order = { adult: 2 };
    const expectedResponse = [new TicketTypeRequest(adultTicketString, 2)];

    expect(OrderBuilder(order)).toStrictEqual(expectedResponse);
  });

  test("should build the correct order given no infants", () => {
    const order = { adult: 1, child: 2 };
    const expectedResponse = [
      new TicketTypeRequest(adultTicketString, 1),
      new TicketTypeRequest(childTicketString, 2),
    ];

    expect(OrderBuilder(order)).toStrictEqual(expectedResponse);
  });

  test("should build the correct order given no children", () => {
    const order = { adult: 3, infant: 2 };
    const expectedResponse = [
      new TicketTypeRequest(adultTicketString, 3),
      new TicketTypeRequest(infantTicketString, 2),
    ];

    expect(OrderBuilder(order)).toStrictEqual(expectedResponse);
  });

  test("should build the correct order given many tickets", () => {
    const order = { adult: 9, child: 7, infant: 4 };
    const expectedResponse = [
      new TicketTypeRequest(adultTicketString, 9),
      new TicketTypeRequest(childTicketString, 7),
      new TicketTypeRequest(infantTicketString, 4),
    ];

    expect(OrderBuilder(order)).toStrictEqual(expectedResponse);
  });

  test("should build the correct order given minimum tickets", () => {
    const order = { adult: 1 };
    const expectedResponse = [new TicketTypeRequest(adultTicketString, 1)];

    expect(OrderBuilder(order)).toStrictEqual(expectedResponse);
  });
});
