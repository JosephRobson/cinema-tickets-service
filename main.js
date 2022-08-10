import express, { Router } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import ticketsRoutes from "./src/routes/ticketsRoutes.js";

const app = express();
app.use(express.json());

const router = Router();
router.use(
  OpenApiValidator.middleware({
    apiSpec: "./openApi.yaml",
    validateRequests: true,
    validateResponses: true,
  })
);

router.use("/v1", ticketsRoutes);

app.use(router);

app.listen(3000);
