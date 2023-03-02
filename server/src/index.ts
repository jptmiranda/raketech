import * as dotenv from "dotenv";
import express from "express";
import { createClient } from "redis";
import { router } from "./routes";

const redisClient = createClient();

const main = async () => {
  dotenv.config();

  redisClient.on("error", (error) => console.error(`Redis Error: ${error}`));
  await redisClient.connect();

  const port = process.env.port || 8080;
  const app = express();

  app.use(express.json());
  app.use("/", router);
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main();

export { redisClient };
