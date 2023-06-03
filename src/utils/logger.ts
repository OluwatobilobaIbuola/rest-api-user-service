import dayjs from "dayjs";
import logger from "pino";
import dotenv from "dotenv";
dotenv.config();

const log = logger({
  base: {
    pid: false,
  },
  level: process.env.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
export default log;
