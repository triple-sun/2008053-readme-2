import { PartialType, PickType } from "@nestjs/swagger";
import { PostCreateDTO } from "./post-create.dto";

export class PostUpdateDTO extends PartialType(
  PickType(PostCreateDTO, ['tags', 'contentType', 'content', 'userID'] as const)
) {}
