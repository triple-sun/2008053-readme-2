import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiResponse, ApiResponseMetadata } from "@nestjs/swagger"
import { AppError } from "../const/error.const"
import { AppInfo } from "../enum/info.enum"

const OK = ({type, description}: ApiResponseMetadata) => ApiResponse({
  type,
  status: HttpStatus.OK,
  description
})

export const NotFound = ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppError.NotFound  })
export const UnAuth = ApiResponse({ status: HttpStatus.UNAUTHORIZED,  description: AppError.Unauthorized  })
export const Forbidden = ApiResponse({ status: HttpStatus.FORBIDDEN, description: AppError.Forbidden })
export const Conflict = ApiResponse({ status: HttpStatus.CONFLICT, description: AppError.Conflict })
export const Internal = ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: AppError.Internal})

export const getCustomDecorators = (metadata: ApiResponseMetadata, ...decorators: (MethodDecorator)[]) => applyDecorators(
  OK(metadata),
  ...decorators.filter((decorator) => !!decorator)
)
