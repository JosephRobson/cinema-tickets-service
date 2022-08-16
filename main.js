import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import esmresolver from "./src/services/EsmResolver.js";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const controllersPath = pathToFileURL(
  path.join(__dirname, "src", "controllers")
).href;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "openApi.yaml"),
    validateRequests: true,
    validateResponses: true,
    operationHandlers: esmresolver(controllersPath),
  })
);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    message: err.message || "Unexpected server error",
    errors: err.errors,
  });
});

app.listen(3000);

export default app;
