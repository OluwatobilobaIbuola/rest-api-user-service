import express from "express";
import dotenv from "dotenv";
import logger from "./src/utils/logger";
import route from "./src/routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/user-service", route);

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server listening on port ${process.env.PORT || 3000}`);
});
