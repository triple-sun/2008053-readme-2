import { FieldName } from "../../enum/field-name.enum";
import { MinMax } from "../../enum/minmax.enum";
import { PostAPIExample } from "../../enum/post.enum";
import { EntityName } from "../../enum/utils.enum";
import { getDescForEntity, getDescForPost } from "../../utils/desc.utils";
import { TAPIProp } from "../api-prop";

export const ContentAPIProp: TAPIProp = {
  [FieldName.LinkUrl]: {
    required: true,
    description: getDescForEntity(EntityName.Link, FieldName.LinkUrl),
    example: PostAPIExample.LinkUrl
  },
  [FieldName.Desc]: {
    description: getDescForEntity(EntityName.Link, FieldName.Desc),
    example: PostAPIExample.Desc,
    maxLength: MinMax.DescMax
  },
  [FieldName.PhotoUrl]: {
    required: true,
    description: getDescForEntity(EntityName.Photo, FieldName.PhotoUrl),
    example: PostAPIExample.Photo
  },
  [FieldName.Quote]: {
    required: true,
    minLength: MinMax.QuoteMin,
    maxLength: MinMax.QuoteMax,
    description: getDescForEntity(EntityName.Quote, FieldName.Quote),
    example: PostAPIExample.Quote
  },
  [FieldName.Author]: {
    required: true,
    minLength: MinMax.AuthorMin,
    maxLength: MinMax.AuthorMax,
    description: getDescForEntity(EntityName.Quote, FieldName.Author),
    example: PostAPIExample.Author
  },
  [FieldName.Title]: {
    required: true,
    minLength: MinMax.TitleMin,
    maxLength: MinMax.TitleMax,
    description: getDescForPost(FieldName.Title),
    example: PostAPIExample.Title
  },
  [FieldName.Ann]: {
    required: true,
    minLength: MinMax.AnnMin,
    maxLength: MinMax.AnnMax,
    description: getDescForEntity(EntityName.Text, FieldName.Ann),
    example: PostAPIExample.Ann
  },
  [FieldName.Text]: {
    required: true,
    minLength: MinMax.TextMin,
    maxLength: MinMax.TextMax,
    description: getDescForEntity(EntityName.Text, FieldName.Text),
    example: PostAPIExample.Text
  },
  [FieldName.VideoUrl]: {
    required: true,
    description: getDescForEntity(EntityName.Video, FieldName.VideoUrl),
    example: PostAPIExample.VideoUrl
  }
}

