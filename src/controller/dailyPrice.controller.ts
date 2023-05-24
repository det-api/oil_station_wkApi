import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  getDailyPrice,
  addDailyPrice,
  updateDailyPrice,
  deleteDailyPrice,
  dailyPriceByDate,
} from "../service/dailyPrice.service";

export const getDailyPriceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getDailyPrice(req.query);
    // console.log(result[0].date.toLocaleString())
    // result.map((ea) => (ea.date = new Date(ea.date).toLocaleString()));
    // console.log(result)
    fMsg(res, "DailyPrice are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const addDailyPriceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addDailyPrice(req.body);
    fMsg(res, "New DailyPrice data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateDailyPriceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateDailyPrice(req.query, req.body);
    fMsg(res, "updated DailyPrice data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteDailyPriceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteDailyPrice(req.query);
    fMsg(res, "DailyPrice data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};

export const dailyPriceByDateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let sDate = req.query.sDate;
    let eDate = req.query.eDate;

    if (!sDate ) {
      throw new Error("you need date");
    }
    if(!eDate) {
      eDate = new Date ().toLocaleDateString(`fr-CA`)
    }

    if (typeof sDate === "string" && typeof eDate === "string") {
      const startDate = new Date(sDate).toLocaleDateString(`fr-CA`);
      const endDate = new Date(eDate).toLocaleDateString(`fr-CA`);
      let result = await dailyPriceByDate(startDate, endDate);
      fMsg(res, "between two date", result);
    }
  } catch (e) {
    next(new Error(e));
  }
};

// const startDate = new Date("2023-04-28T00:00:00Z");
// const endDate = new Date("2023-04-29T23:59:59Z");
// const sToday = startDate.split('/').join('-')
// const eToday = endDate.split('/').join('-')
// console.log(startDate , endDate)
// console.log(sToday, eToday);
