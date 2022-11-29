
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";

export class Photo {
  @Prop({
    required: true
  })
  @Expose()
  public photo: string;
}

@Schema()
export class PhotoModel {
  @Prop({
    required: true
  })
  @Expose()
  public content: Photo;
}

export const PhotoSchema = SchemaFactory.createForClass(PhotoModel);
