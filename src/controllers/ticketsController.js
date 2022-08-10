class TicketsController {
  async handlePurchase(req, res, next) {
    await console.log("handle purchase hit");
    res.status(201);
    res.send();
  }
}

export default TicketsController;
