import { FilterQuery, UpdateQuery } from "mongoose";
import dailyPriceModel, { dailyPriceDocument } from "../model/dailyPrice.model";

export const getDailyPrice = async (query: FilterQuery<dailyPriceDocument>) => {
  try {
    return await dailyPriceModel.find(query).lean().select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const getOneDailyPrice = async (
  query: FilterQuery<dailyPriceDocument>
) => {
  try {
    let d1 = new Date(query.date).toLocaleDateString(`fr-CA`);
    console.log(d1);
    let result = await dailyPriceModel.find({
      date: { $gte: `${d1}T00:00:00Z`, $lte: `${d1}T23:59:59Z` },
    });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const addDailyPrice = async (body: dailyPriceDocument) => {
  try {
    return await new dailyPriceModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const updateDailyPrice = async (
  query: FilterQuery<dailyPriceDocument>,
  body: UpdateQuery<dailyPriceDocument>
) => {
  try {
    await dailyPriceModel.updateMany(query, body);
    return await dailyPriceModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteDailyPrice = async (
  query: FilterQuery<dailyPriceDocument>
) => {
  try {
    let DailyPrice = await dailyPriceModel.find(query);
    if (!DailyPrice) {
      throw new Error("No DailyPrice with that id");
    }
    return await dailyPriceModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const dailyPriceByDate = async (
  d1: any,
  d2: any
): Promise<dailyPriceDocument[]> => {
  let result = await dailyPriceModel.find({
    date: { $gte: `${d1}T00:00:00Z`, $lte: `${d2}T23:59:59Z` },
  });
  return result;
};
