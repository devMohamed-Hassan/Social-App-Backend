import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/sendSuccess";

export interface IPostServices {
  createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}

export class PostServices implements IPostServices {
  createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { content, privacy, tags } = req.body;

    const images =
      (req.files as Express.Multer.File[] | undefined)?.map(
        (file) => file.path
      );

    return sendSuccess({
      res,
      statusCode: 201,
      message: "Post created successfully",
      data: {
        content,
        privacy,
        tags,
        images,
      },
    });
  };
}
