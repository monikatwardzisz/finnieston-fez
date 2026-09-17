import express from "express";
import cors from "cors";

import menu from "./routes/menu";
import reservations from "./routes/reservations";
import ordersRouter from "./routes/orders";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to finnieston fez");
});

app.use("/menu", menu);

app.use("/reservations", reservations);

app.use("/orders", ordersRouter);

export default app;