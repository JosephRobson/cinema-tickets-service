import SeatCounter from "../../../src/services/seatCounter.js";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest.js";

const adultTicketString = "ADULT";
const childTicketString = "CHILD";
const infantTicketString = "INFANT";

describe("Seat Counter", () => {
  test("should calculate the correct number of seats to book for an order", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 2),
      new TicketTypeRequest(infantTicketString, 1),
    ];
    const expectedSeats = 4;

    expect(SeatCounter(order)).toBe(expectedSeats);
  });

  test("should calculate the correct number of seats when only adults specified", () => {
    const order = [new TicketTypeRequest(adultTicketString, 2)];
    const expectedSeats = 2;

    expect(SeatCounter(order)).toBe(expectedSeats);
  });

  test("should calculate the correct number of seats when only adults and children specified", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(childTicketString, 5),
    ];
    const expectedSeats = 7;

    expect(SeatCounter(order)).toBe(expectedSeats);
  });

  test("should calculate the correct number of seats when only adults and infants specified", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 2),
      new TicketTypeRequest(infantTicketString, 1),
    ];
    const expectedSeats = 2;

    expect(SeatCounter(order)).toBe(expectedSeats);
  });

  test("should calculate the correct number of seats to book for a large order", () => {
    const order = [
      new TicketTypeRequest(adultTicketString, 10),
      new TicketTypeRequest(childTicketString, 10),
      new TicketTypeRequest(infantTicketString, 0),
    ];
    const expectedSeats = 20;

    expect(SeatCounter(order)).toBe(expectedSeats);
  });

  test("should calculate the correct number of seats to book for a small order", () => {
    const order = [new TicketTypeRequest(adultTicketString, 1)];
    const expectedSeats = 1;

    expect(SeatCounter(order)).toBe(expectedSeats);
  });
});
