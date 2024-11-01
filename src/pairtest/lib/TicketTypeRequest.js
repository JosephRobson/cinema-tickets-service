/**
 * Immutable Object.
 */

export default class TicketTypeRequest {
  // TODO bring out into tickets type object
  static #ticketCosts = { ADULT: 2500, CHILD: 1500, INFANT: 0 };

  #type;

  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(
        `type must be ${this.#Type
          .slice(0, -1)
          .join(", ")}, or ${this.#Type.slice(-1)}`
      );
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError("noOfTickets must be an integer");
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  getTicketCost() {
    return (
      TicketTypeRequest.#ticketCosts[this.getTicketType()] *
      this.getNoOfTickets()
    );
  }

  #Type = ["ADULT", "CHILD", "INFANT"];
}
