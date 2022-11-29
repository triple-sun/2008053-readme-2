import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MinMax } from "@readme/core";
import { Expose } from "class-transformer";

export class Video {
  type: string;

  @Prop({
    required: true,
    minlength: MinMax.TitleMin,
    maxlength: MinMax.TitleMax
  })
  title: string;

  @Prop({
    required: true
  })
  videoLink: string;
}

@Schema()
export class VideoModel {
  @Prop({
    required: true
  })
  @Expose()
  public content: Video;
}

export const VideoSchema = SchemaFactory.createForClass(VideoModel);
