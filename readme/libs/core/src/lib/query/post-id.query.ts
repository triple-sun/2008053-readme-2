import { PickType } from "@nestjs/swagger";
import { PostDTO } from "../dto/post.dto";

export class PostIDQuery extends PickType(PostDTO, ['postID'] as const) {}
