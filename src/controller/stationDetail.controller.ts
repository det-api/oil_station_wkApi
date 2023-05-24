import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  getStationDetail,
  addStationDetail,
  updateStationDetail,
  deleteStationDetail,
} from "../service/stationDetail.service";
import { getDailyPrice } from "../service/dailyPrice.service";

export const getStationDetailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getStationDetail(req.query);

    await Promise.all(
      result.map(async (ea) => {
        let prices = await getDailyPrice({ stationId: ea["_id"] });
        ea["prices"] = prices;
      })
    );

    fMsg(res, "StationDetail are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const addStationDetailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addStationDetail(req.body);
    fMsg(res, "New StationDetail data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateStationDetailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateStationDetail(req.query, req.body);
    fMsg(res, "updated StationDetail data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteStationDetailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteStationDetail(req.query);
    fMsg(res, "StationDetail data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};
