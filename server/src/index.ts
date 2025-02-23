import { config } from "./config/env";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
