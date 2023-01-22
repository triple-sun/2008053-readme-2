import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiUnauthorizedResponse, ApiConflictResponse, ApiForbiddenResponse, ApiBearerAuth, ApiOkResponse, ApiResponseMetadata } from '@nestjs/swagger';
import { AppError } from '../const/error.const';
import { Entity } from '../enum/utils.enum';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

export const ApiCommonResponses = (entity: Entity, {type, description}: ApiResponseMetadata) => {
  return applyDecorators(
    ApiOkResponse({type, description}),
    ApiNotFoundResponse({ description: `${entity} ${AppError.NotFound}` }),
    ApiConflictResponse({ description: `${entity} ${AppError.Conflict}` }),
  )
}

export const ApiAuth = (entity: Entity) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: AppError.Unauthorized }),
    ApiForbiddenResponse({ description: `${AppError.Unauthorized} ${entity}`})
  )
}
