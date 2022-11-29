import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";

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
export class LinkModel {
  @Prop({
    required: true,
    type: () => Link
  })
  @Expose()
  public content: Link
}

export const LinkSchema = SchemaFactory.createForClass(LinkModel);
