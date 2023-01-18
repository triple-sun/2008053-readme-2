import { APIExample } from "../../enum/api.enum";
import { FieldName } from "../../enum/field-name.enum";


export const CommonAPIProp = {
  [FieldName.ID]: {
    example: APIExample.PostgresID,
    required: true
  }
}
