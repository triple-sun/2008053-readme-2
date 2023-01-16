import { Injectable } from "@nestjs/common";
import { ErrorMessage, Constraint } from "@readme/core";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PostRepository } from "../post.repository";

@ValidatorConstraint({ name: Constraint.PostExists, async: true })
@Injectable()
export class PostExistsRule implements ValidatorConstraintInterface {
  constructor(private postRepository: PostRepository) {}

  async validate(postID: number) {
    const post = await this.postRepository.findOne(postID)

    return !!post
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.Post.NotFound(value)
  }
}

