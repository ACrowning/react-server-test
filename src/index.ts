import express from "express";
import cors from "cors";
import EventRoutes from "./controllers/event";
import ParticipantRoutes from "./controllers/participant";
import { checkHealth } from "./controllers/health";
import { initDatabaseStructure } from "./database/index";

const app = express();
const PORT = process.env.PORT || 4000;
const readyMessage = () => console.log("Server on http://localhost:" + PORT);

async function initApp() {
  try {
    await initDatabaseStructure("init.sql");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: "*" }));
    app.use("/events", EventRoutes);
    app.use("/participants", ParticipantRoutes);

    app.get("/health", checkHealth);

    app.listen(PORT, readyMessage);

    app.listen(80, function () {
      console.log("CORS-enabled web server listening on port 80");
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initApp();
