import { PickType } from "@nestjs/swagger";
import { PostUpdateDTO } from "./post-update.dto";

export class PostDeleteDTO extends PickType(PostUpdateDTO, ['postID'] as const) {}
