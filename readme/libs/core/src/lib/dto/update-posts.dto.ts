import { IntersectionType, PickType } from "@nestjs/swagger";
import { PostDTO, UserDTO } from "@readme/core";

export class UserIDDTO extends PickType(UserDTO, ['userID'] as const) {}

export class PostIDDTO extends PickType(PostDTO, ['postID'] as const) {}

export class UpdatePostsDTO extends IntersectionType(
  UserIDDTO,
  PostIDDTO
) {}
