import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  getNozzle,
  updateNozzle,
  deleteNozzle,
  addNozzle,
  updateNozzleBySerialNo,
} from "../service/nozzle.service";

export const getNozzleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getNozzle(req.query);
    fMsg(res, "Nozzle are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const addNozzleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addNozzle(req.body);
    fMsg(res, "New Nozzle data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateNozzleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateNozzle(req.query, req.body);
    fMsg(res, "updated Nozzle data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteNozzleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteNozzle(req.query);
    fMsg(res, "Nozzle data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};

// update realtime data come from mqtt.

export const updateNozzleSerialHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      let result = await updateNozzleBySerialNo(req.query, req.body);
      fMsg(res, "Nozzle data was updated" , result);
  } catch (e) {
    next(new Error(e));
  }
};
