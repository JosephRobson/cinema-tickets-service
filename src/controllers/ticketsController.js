class TicketsController {
  async handlePostPurchase(req, res, next) {
    await console.log("handle purchase hit");
    res.status(201);
    res.send();
  }
}

export default TicketsController;
