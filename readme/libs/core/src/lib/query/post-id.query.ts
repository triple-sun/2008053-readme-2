import { PickType } from "@nestjs/swagger";
import { Post } from "../dto/post.dto";

export class PostIDQuery extends PickType(Post, ['postID'] as const) {}
