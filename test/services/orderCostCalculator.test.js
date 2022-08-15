import { OrderCostCalculator } from "../../src/middleware/OrderCostCalculator.js";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";

const adultTicketString = "ADULT";
const childTicketString = "CHILD";
const infantTicketString = "INFANT";

describe("Order Cost Calculator", () => {
    test("should calculate the correct cost for an order", () => {
      const normalOrder = [
        new TicketTypeRequest(adultTicketString, 2),
        new TicketTypeRequest(childTicketString, 2),
        new TicketTypeRequest(infantTicketString, 1),
      ];
      const expectedCost = 60000;
  
      expect(OrderCostCalculator(validTicketTypeRequests)).toBe(expectedCost);
    });
    
    test("should calculate the correct cost for a order containing only adults", () => {
      const normalOrder = [
        new TicketTypeRequest(adultTicketString, 5),
      ];
      const expectedCost = 100000;
  
      expect(OrderCostCalculator(validTicketTypeRequests)).toBe(expectedCost);
    });
    
    test("should calculate the correct cost for an order containing only adults and children", () => {
      const normalOrder = [
        new TicketTypeRequest(adultTicketString, 2),
        new TicketTypeRequest(childTicketString, 8),
      ];
      const expectedCost = 120000;
  
      expect(OrderCostCalculator(validTicketTypeRequests)).toBe(expectedCost);
    });
    
    test("should calculate the correct cost for an order containing only adults and infants", () => {
      const normalOrder = [
        new TicketTypeRequest(adultTicketString, 2),
        new TicketTypeRequest(infantTicketString, 2),
      ];
      const expectedCost = 40000;
  
      expect(OrderCostCalculator(validTicketTypeRequests)).toBe(expectedCost);
    });
    
    test("should calculate the correct cost for a large order", () => {
        const normalOrder = [
          new TicketTypeRequest(adultTicketString, 10),
          new TicketTypeRequest(childTicketString, 8),
          new TicketTypeRequest(infantTicketString, 2),
        ];
        const expectedCost = 280000;
    
        expect(OrderCostCalculator(validTicketTypeRequests)).toBe(expectedCost);
    });
});
