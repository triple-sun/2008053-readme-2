
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";
import { ContentModel } from "./content.model";

@Schema()
export class Quote {
  @Prop({
    required: true,
    minlength: MinMax.QuoteMin,
    maxlength: MinMax.QuoteMax
  })
  quote: string;

  @Prop({
    required: true,
    minlength: MinMax.AuthorMin,
    maxlength: MinMax.AuthorMax
  })
  author: string;
}

@Schema()
export class QuoteModel implements ContentModel {
  @Prop({
    required: true
  })
  @Expose()
  public content: Quote;
}

export const QuoteSchema = SchemaFactory.createForClass(QuoteModel);
