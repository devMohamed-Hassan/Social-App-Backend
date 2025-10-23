import { z } from "zod";
import { objectIdValidator } from "../../common/validators";

export const blockUserSchema = {
  params: z.object({
    id: objectIdValidator,
  }),
};

export const unblockUserSchema = {
  params: z.object({
    id: objectIdValidator,
  }),
};

export const getBlockedUsersSchema = {
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
  }),
};
