import { FilterQuery, UpdateQuery } from "mongoose";
import nozzleModel, {
  nozzleDocument,
  nozzleInput,
} from "../model/nozzle.model";

export const getNozzle = async (query: FilterQuery<nozzleDocument>) => {
  try {
    return await nozzleModel.find(query).lean().select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const addNozzle = async (body: nozzleInput) => {
  try {
    return await new nozzleModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const updateNozzle = async (
  query: FilterQuery<nozzleDocument>,
  body: UpdateQuery<nozzleDocument>
) => {
  try {
    await nozzleModel.updateMany(query, body);
    return await nozzleModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteNozzle = async (query: FilterQuery<nozzleDocument>) => {
  try {
    let Nozzle = await nozzleModel.find(query);
    if (!Nozzle) {
      throw new Error("No Nozzle with that id");
    }
    return await nozzleModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateNozzleBySerialNo = async (
  query: FilterQuery<nozzleDocument>,
  conditon: string
) => {
  try {
    let nozzle = await getNozzle(query);
    let result = await updateNozzle(
      { _id: nozzle[0]["_id"] },
      { currentLiter: nozzle[0]["currentLiter"] + 1 }
    );
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
