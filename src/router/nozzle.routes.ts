const nozzleRoute = require("express").Router();
import {
  getNozzleHandler,
  addNozzleHandler,
  updateNozzleHandler,
  deleteNozzleHandler,
} from "../controller/nozzle.controller";


nozzleRoute.get("/", getNozzleHandler);
nozzleRoute.post("/", addNozzleHandler);
nozzleRoute.patch("/", updateNozzleHandler);
nozzleRoute.delete("/", deleteNozzleHandler);

export default nozzleRoute;
