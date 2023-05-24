import {
    addFuelBalanceHandler,
    deleteFuelBalanceHandler,
    getAllFuelBalanceHandler,
    getFuelBalanceHandler,
    updateFuelBalanceHandler,
  } from "../controller/fuelBalance.controller";
  import { hasAnyPermit } from "../middleware/permitValidator";
  import { roleValidator } from "../middleware/roleValidator";
  import { validateAll, validateToken } from "../middleware/validator";
  const fuelBalanceRoute = require("express").Router();
  
  fuelBalanceRoute.get(
    "/",
    validateToken,
    hasAnyPermit(["view"]),
    getFuelBalanceHandler
  );
  fuelBalanceRoute.post(
    "/",
    validateToken,
    roleValidator("admin"),
    hasAnyPermit(["add"]),
    addFuelBalanceHandler
  );
  
  fuelBalanceRoute.patch(
    "/",
    validateToken,
    roleValidator("admin"),
    hasAnyPermit(["edit"]),
    updateFuelBalanceHandler
  );
  
  fuelBalanceRoute.delete(
    "/",
    validateToken,
    roleValidator("admin"),
    hasAnyPermit(["delete"]),
    deleteFuelBalanceHandler
  );
  
  export default fuelBalanceRoute;
  