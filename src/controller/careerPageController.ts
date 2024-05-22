import { Request, Response } from "express";
import { client } from "../models/dbConnection";
import { getCareerPages } from "../queries";

const getCareerPageData = async (req: Request, res: Response) => {
  try {
    const result = await client.query(getCareerPages);
    return res.json(result.rows);
  } catch (err) {
    console.log(`something went wrong: ${err}`);
  }
};

export { getCareerPageData };
