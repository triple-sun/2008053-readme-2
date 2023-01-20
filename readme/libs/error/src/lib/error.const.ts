import { ConflictException } from "@nestjs/common";
import { ECommonError } from "./enum/common.error.enum";
import { EEntity } from "./enum/model.enum";
import { IMessageProps } from "./error.type";
import { getENVErrorMessage, getExistsMessage, getInvalidMessage, getLengthErrorMessage, getNotFoundMessage, getPermissionErrorMessage } from "./utils.error";

export const ErrorMessage = {
  Exists: (props: IMessageProps) => getExistsMessage(props),
  NotFound: (props: IMessageProps) => getNotFoundMessage(props),
  Permission: (props: IMessageProps) => getPermissionErrorMessage(props),
  Invalid: (props: IMessageProps) => getInvalidMessage(props),
  ENV: getENVErrorMessage,
  Length: getLengthErrorMessage,
  Common: ECommonError
}
