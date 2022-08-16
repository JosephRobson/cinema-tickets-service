import express, { Router } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import ticketsRoutes from "./src/routes/ticketsRoutes.js";

const app = express();
app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openApi.yaml",
    validateRequests: true,
    validateResponses: true,
    validateApiSpec: true,
  })
);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

const router = Router();
router.use("/v1", ticketsRoutes);
app.use(router);

app.listen(3000);

export default app;
