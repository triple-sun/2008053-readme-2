import { ConflictException } from "@nestjs/common";
import { capitalize } from "@readme/core";
import { EEntity } from "./enum/model.enum";
import { EType } from "./enum/type.enum";
import { IMessageProps } from "./error.type";

const { Comment, Post, User } = EEntity

export const getNotFoundMessage = (
({entity, property}: IMessageProps) => ((
    value?: string | number,
    args?: IMessageProps
  ) => (`
    ${capitalize(entity  || args.entity
      ? `${entity ?? args.entity} with`
      : ''
    )}
    ${property || args.property
      ? ` ${property ?? args.property}:`
      : ''
    } value ${
        value ?? args.value
    } not found.
  `))
)

export const getExistsMessage = (
({entity, property}: IMessageProps) => ((
    value: string | number,
    args?: IMessageProps
  ) => (`
    ${capitalize(
      entity ?? args.entity ?? ''
    )}
    ${property || args.property
      ? `with ${property ?? args.property}:`
      : ''
    }
    ${value ?? args.value} already exists.
  `))
)

export const getInvalidMessage = (
({entity, property}: IMessageProps) => ((
    args?: IMessageProps
  ) => (`
    ${args.value} is not valid
    ${property || args.property
      ? ` for property ${property ?? args.property}`
      : ''}
    ${entity ? ` of ${entity}` : '.'}
  `))
)

export const getENVErrorMessage = (
  {value, targetName, property}: IMessageProps
) => `${targetName} ${property.toLowerCase().replace(/_/g, " ")} is required. Current value: ${value}`

export const getPermissionErrorMessage = (({entity}: IMessageProps) => (({value}: IMessageProps) => (
  `You can only ${entity === Comment
    ? ''
    : 'edit'
  }${ entity === Post
    ? ', publish'
    : ''
  }${ entity !== Comment
    ? ' or'
    : ''
  } delete your own ${entity === User
    ? 'data'
    : `${entity.toString().toLowerCase()}s`}. ${entity} ID: ${value}
`)))

export const getLengthErrorMessage = ({property, constraints, value}: IMessageProps) => (`
  ${property} length must be ${
    constraints[1]
      ? `no more than ${constraints[1]}.`
      : ''
  } ${
    constraints[0] && constraints[1]
      ? 'and'
      : ''
  } ${
    constraints[0]
      ? `no less than ${constraints[0]}`
      : ''
  } symbols. Provided ${property} "${value}" is ${value.length} symbols long.
`)
