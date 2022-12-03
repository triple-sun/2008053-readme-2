import { IntersectionType } from "@nestjs/swagger";
import { RDOBase } from "@readme/shared-types";
import { CommentCreateDTO } from "../dto/comment-create.dto";

export class CommentRDO extends IntersectionType (
  RDOBase,
  CommentCreateDTO
) {}
