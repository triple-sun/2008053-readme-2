import { PickType } from "@nestjs/swagger";
import { Post } from "../entity/post";

export class PostIDQuery extends PickType(Post, ['postID'] as const) {}
