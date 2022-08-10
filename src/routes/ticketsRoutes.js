import { Router } from "express";

import TicketsController from "../controllers/ticketsController.js";
const ticketsController = new TicketsController();

const ticketsRoutes = Router();

ticketsRoutes.route("/tickets/purchase").post(ticketsController.handlePurchase);

export default ticketsRoutes;
