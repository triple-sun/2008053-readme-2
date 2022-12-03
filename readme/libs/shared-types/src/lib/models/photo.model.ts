import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { ContentModel } from "./content.model";

export class Photo {
  @Prop({
    required: true
  })
  @Expose()
  public photo: string;
}

@Schema()
export class PhotoModel implements ContentModel {
  @Prop({
    required: true
  })
  @Expose()
  public content: Photo;
}

export const PhotoSchema = SchemaFactory.createForClass(PhotoModel);
