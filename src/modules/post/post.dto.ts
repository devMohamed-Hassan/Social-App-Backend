import z from "zod";
import { createPostSchema, reactToPostSchema } from "./post.validation";

export type creatPostDTO = z.infer<typeof createPostSchema.body>;

export type reactToPostDTO = z.infer<typeof reactToPostSchema.body>;
