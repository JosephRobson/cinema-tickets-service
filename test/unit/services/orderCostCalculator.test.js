import OrderCostCalculator from "../../../src/services/orderCostCalculator.js";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest.js";

const adultTicketString = "ADULT";
const childTicketString = "CHILD";
const infantTicketString = "INFANT";

describe("Order Cost Calculator", () => {
  test("should calculate the correct cost for an order", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 2),
      new TicketTypeRequest(infantTicketString, 1),
    ];
    const expectedCost = 6000;

    expect(OrderCostCalculator(order)).toBe(expectedCost);
  });

  test("should calculate the correct cost for a order containing only adults", () => {
    const order = [new TicketTypeRequest(adultTicketString, 5)];
    const expectedCost = 10000;

    expect(OrderCostCalculator(order)).toBe(expectedCost);
  });

  test("should calculate the correct cost for an order containing only adults and children", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 8),
    ];
    const expectedCost = 12000;

    expect(OrderCostCalculator(order)).toBe(expectedCost);
  });

  test("should calculate the correct cost for an order containing only adults and infants", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(infantTicketString, 2),
    ];
    const expectedCost = 4000;

    expect(OrderCostCalculator(order)).toBe(expectedCost);
  });

  test("should calculate the correct cost for a large order", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 10),
      new TicketTypeRequest(childTicketString, 8),
      new TicketTypeRequest(infantTicketString, 2),
    ];
    const expectedCost = 28000;

    expect(OrderCostCalculator(order)).toBe(expectedCost);
  });
});
