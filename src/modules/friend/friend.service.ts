import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../repositories/user.repository";
import { sendSuccess } from "../../utils/sendSuccess";
import { Types } from "mongoose";
import { IUser } from "../../models/user.model";
import { AppError } from "../../utils/AppError";

export interface IFriendServices {
  sendRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}

export class FriendService implements IFriendServices {
  private userRepository = new UserRepository();

  constructor() {}

  sendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const fromId = req.user._id as Types.ObjectId;
    const { id: toUserId } = req.params;

    if (!toUserId) throw new AppError("Missing target user ID", 400);
    if (fromId.toString() === toUserId)
      throw new AppError("You cannot send a request to yourself", 400);

    const fromUser = (await this.userRepository.findById(
      fromId.toString()
    )) as IUser | null;
    const toUser = (await this.userRepository.findById(
      toUserId
    )) as IUser | null;

    if (!toUser) throw new AppError("User not found", 404);

    const toUserObjectId = toUser._id as Types.ObjectId;

    if (
      fromUser?.friends.some(
        (id) => id.toString() === toUserObjectId.toString()
      )
    ) {
      throw new AppError("Already friends", 400);
    }

    const existing = toUser.friendRequests.find(
      (r) => r.from.toString() === fromId.toString() && r.status === "pending"
    );
    
    if (existing) throw new AppError("Friend request already sent", 400);


    toUser.friendRequests.push({
      from: fromId,
      to: toUserObjectId,
      status: "pending",
    });
    await toUser.save();

    return sendSuccess({
      res,
      statusCode: 200,
      message: "Friend request sent successfully",
      data: {
        from: {
          id: fromUser?._id,
          firstName: fromUser?.firstName,
          lastName: fromUser?.lastName,
        },
        to: {
          id: toUserObjectId,
          firstName: toUser.firstName,
          lastName: toUser.lastName,
        },
      },
    });
  };
}
