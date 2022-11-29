import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";

export class Text {
  @Prop({
    required: true,
    minlength: MinMax.TitleMin,
    maxlength: MinMax.TitleMax
  })
  @Expose()
  public title: string;

  @Prop({
    required: true,
    minlength: MinMax.AnnMin,
    maxlength: MinMax.AnnMax
  })
  @Expose()
  public ann: string;

  @Prop({
    required: true,
    minlength: MinMax.TextMin,
    maxlength: MinMax.TextMax
  })
  @Expose()
  public text: string;
}

@Schema()
export class TextModel {
  @Prop({
    required: true,
    type: () => Text
  })
  @Expose()
  public content: Text;
}

export const TextSchema = SchemaFactory.createForClass(TextModel);
