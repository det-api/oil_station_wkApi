import {
  getDailyPriceHandler,
  addDailyPriceHandler,
  updateDailyPriceHandler,
  deleteDailyPriceHandler,
  dailyPriceByDateHandler,
} from "../controller/dailyPrice.controller";
import { hasAnyPermit } from "../middleware/permitValidator";
import { validateAll, validateToken } from "../middleware/validator";
import { allSchemaId, dailyPriceSchema } from "../schema/scheama";
import { roleValidator } from "../middleware/roleValidator";
const dailyPriceRoute = require("express").Router();

dailyPriceRoute.get(
  "/bydate",
  validateToken,
  hasAnyPermit(["view"]),
  dailyPriceByDateHandler
);

dailyPriceRoute.get(
  "/",
  validateToken,
  hasAnyPermit(["view"]),
  getDailyPriceHandler
);

dailyPriceRoute.post(
  "/",
  validateToken,
  validateAll(dailyPriceSchema),
  roleValidator("admin"),
  hasAnyPermit(["add"]),
  addDailyPriceHandler
);
dailyPriceRoute.patch(
  "/",
  validateToken,
  validateAll(allSchemaId),
  roleValidator("admin"),
  hasAnyPermit(["edit"]),
  updateDailyPriceHandler
);
dailyPriceRoute.delete(
  "/",
  validateToken,
  validateAll(allSchemaId),
  roleValidator("admin"),
  hasAnyPermit(["delete"]),
  deleteDailyPriceHandler
);

export default dailyPriceRoute;
