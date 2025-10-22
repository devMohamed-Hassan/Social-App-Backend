import z from "zod";
import { objectIdString } from "../../common/validators";

export const sendFriendRequestSchema = {
  params: z.object({
    id: objectIdString,
  }),
};
