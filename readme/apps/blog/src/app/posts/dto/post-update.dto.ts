import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { PostCreateDTO } from "@readme/shared-types";

export class PostUpdateDTO extends IntersectionType(
  PartialType(
    PickType(PostCreateDTO, ['tags', 'content'] as const)
  ),
  PickType(PostCreateDTO, ['userID' ] as const)
) {}
