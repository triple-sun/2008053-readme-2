import { ErrorType } from "./common.error.enum";
import { Entity } from "../enum/utils.enum";
import { TPropErrors, TErrorProps, TError, ErrorProperty } from "./error.type";

export const getPermissionError = (entity: Entity) => (`You can only ${entity === Entity.Comment
  ? ''
  : 'edit'
}${entity === Entity.Post
  ? ', publish'
  : ''
}${entity !== Entity.Comment
  ? ' or'
  : ''
} delete your own ${entity === Entity.User
  ? 'data'
  : `${entity.toString().toLowerCase()}s`}.`)

const getErrorMessage = ({entity, value, prop}: TErrorProps) => `${entity} ${ prop ?? ''} ${value}`

const TypesForProp = {
  [ErrorProperty.ID]: [ErrorType.NotFound, ErrorType.Invalid, ErrorType.Permission],
  [ErrorProperty.Email]: [ErrorType.Exists, ErrorType.NotFound, ErrorType.Invalid]
}

export class ErrorMessage {
  private errors: TPropErrors | TError
  private entity: Entity

  constructor(entity: Entity, props: ErrorProperty[]) {
   this.entity = entity

   this.mapProps(props)
  }

  public get Errors() {
    return this.errors
  }

  private mapProps = (props: ErrorProperty[]) => {

    const getMessageForType = {
      [ErrorType.NotFound]: (props: TErrorProps) => ((value: string | number) => `${getErrorMessage({value, ...props})} was not found.`),
      [ErrorType.Exists]: (props: TErrorProps) => ((value: string | number) =>`${getErrorMessage({value, ...props})}  already exists.`),
      [ErrorType.Invalid]: (props: TErrorProps) => ((value: string | number) => `${value} is not a valid ${props.prop}`),
      [ErrorType.Permission]: getPermissionError(this.entity)
    }

    Object.keys(props).forEach((key) => TypesForProp[props[key]].forEach((type: ErrorType) => {
        const message = getMessageForType[type]
        const isFn = typeof message === 'function'
        const error =  isFn ? message({entity: this.entity, type}) : message;
        return (type: ErrorType) => props.length > 1
          ? this.errors[key][type] = error
          : this.errors[type] = error
        }
    )
  )}
}


export const EntityError = {
  Comment: new ErrorMessage(Entity.Comment, [ErrorProperty.ID]).Errors as TError,
  Post: new ErrorMessage(Entity.Post, [ErrorProperty.ID]).Errors as TError,
  User: new ErrorMessage(Entity.User, [ErrorProperty.ID, ErrorProperty.Email]).Errors as TPropErrors
}
