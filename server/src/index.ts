import * as dotenv from "dotenv";
import express from "express";
import { createClient } from "redis";

const main = async () => {
  dotenv.config();

  const redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Redis Error: ${error}`));

  await redisClient.connect();

  const port = process.env.port || 8080;
  const app = express();

  app.use(express.json());

  app.get("/", (_, res) => {
    res.send({
      message: "Hello World!",
    });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main();
