import { Request, Response } from "express";
import { error, ok } from "../handlers/response.handler";
import { tmdbApi } from "../tmdb/tmdb";
import { TMDB } from "../types/tmdb";
import { PersonID, PersonIDCombined } from "../types/person";

// [GET] Person Detail
export const personDetail = async (req: Request, res: Response) => {
  try {
    const { personId }: Pick<Partial<TMDB>, "personId"> = req.params;
    const person: PersonID = await tmdbApi.personDetail({ personId });

    return ok(res, person);
  } catch (e) {
    error(res);
  }
};

// [GET] Person Medias
export const personMedias = async (req: Request, res: Response) => {
  try {
    const { personId }: Pick<Partial<TMDB>, "personId"> = req.params;

    const medias: PersonIDCombined = await tmdbApi.personMedias({ personId });

    return ok(res, medias);
  } catch (e) {
    error(res);
  }
};
