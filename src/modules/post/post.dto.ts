import z from "zod";
import { createPostSchema, reactToPostSchema, updatePostSchema } from "./post.validation";

export type creatPostDTO = z.infer<typeof createPostSchema.body>;

export type updatePostDTO = z.infer<typeof updatePostSchema.body>;

export type reactToPostDTO = z.infer<typeof reactToPostSchema.body>;
