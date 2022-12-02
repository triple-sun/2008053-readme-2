import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MinMax } from "@readme/core";
import { modelOptions } from "@typegoose/typegoose";
import { Expose } from "class-transformer";
import { ContentModel } from "./content.model";

export class Link {
  @Prop({
    required: true
  })
  @Expose()
  public link: string;

  @Prop({
    maxlength: MinMax.DescMax
  })
  @Expose()
  public desc?: string;
}

@Schema()
@modelOptions({ options: { customName: 'Link' } })
export class LinkModel implements ContentModel {
  @Prop({
    required: true,
    _id: false,
    type: () => Link
  })
  @Expose()
  public content: Link
}

export const LinkSchema = SchemaFactory.createForClass(LinkModel);
