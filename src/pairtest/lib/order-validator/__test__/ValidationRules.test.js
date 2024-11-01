import TicketTypeRequest from "../../TicketTypeRequest.js";
import {
  ValidateAccountId,
  IsValidNumberOfTickets,
  IsAdultPresent,
  IsEnoughAdultsForInfants,
} from "../ValidationRules.js";

test.each`
  testAccountId | expectedResponse
  ${0}          | ${false}
  ${1}          | ${true}
  ${10}         | ${true}
  ${999999}     | ${true}
  ${"1"}        | ${false}
  ${"otherStr"} | ${false}
  ${{}}         | ${false}
  ${-1}         | ${false}
`(
  "ValidateAccountId should respond with $expectedResponse if called with $testAccountId",
  ({ testAccountId, expectedResponse }) => {
    expect(ValidateAccountId(testAccountId)).toEqual(expectedResponse);
  }
);

describe("IsValidNumberOfTickets", () => {
  it("should return false if given no tickets", () => {
    expect(IsValidNumberOfTickets([])).toBeFalsy();
  });

  it("should return false if given fewer than 0 tickets", () => {
    const tickets = [new TicketTypeRequest("ADULT", -1)];

    const isvalid = IsValidNumberOfTickets(tickets);
    console.log(isvalid);

    expect(IsValidNumberOfTickets(tickets)).toBeFalsy();
  });

  it("should return false if given greater than 25 tickets", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 10),
      new TicketTypeRequest("CHILD", 10),
      new TicketTypeRequest("INFANT", 6),
    ];

    expect(IsValidNumberOfTickets(tickets)).toBeFalsy();
  });

  it("should be truthy for small valid order", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];
    expect(IsValidNumberOfTickets(tickets)).toBeTruthy();
  });

  it("should be truthy for large valid order", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 10),
      new TicketTypeRequest("CHILD", 10),
      new TicketTypeRequest("INFANT", 5),
    ];
    expect(IsValidNumberOfTickets(tickets)).toBeTruthy();
  });
});

describe("IsAdultPresent", () => {
  it("should be falsy for an order with no adults", () => {
    const tickets = [new TicketTypeRequest("CHILD", 2)];
    expect(IsAdultPresent(tickets)).toBeFalsy();
  });

  it("should be truthy for an order with adults", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 2),
    ];
    expect(IsAdultPresent(tickets)).toBeTruthy();
  });
});

describe("IsEnoughAdultsForInfants", () => {
  it("should be falsy for an order with more infants than adults", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("CHILD", 10),
      new TicketTypeRequest("INFANT", 3),
    ];
    expect(IsEnoughAdultsForInfants(tickets)).toBeFalsy();
  });

  it("should be truthy for an order with fewer infants than adults", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 4),
      new TicketTypeRequest("CHILD", 10),
      new TicketTypeRequest("INFANT", 3),
    ];
    expect(IsEnoughAdultsForInfants(tickets)).toBeTruthy();
  });

  it("should be truthy for an order with equal infants and adults", () => {
    const tickets = [
      new TicketTypeRequest("ADULT", 4),
      new TicketTypeRequest("CHILD", 10),
      new TicketTypeRequest("INFANT", 4),
    ];
    expect(IsEnoughAdultsForInfants(tickets)).toBeTruthy();
  });
});
