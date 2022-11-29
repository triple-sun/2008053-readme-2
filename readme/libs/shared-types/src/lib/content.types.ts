import { Prop } from "@nestjs/mongoose";
import { MinMax } from "@readme/core";

export class Link {
  @Prop({
    required: true
  })
  link: string;

  @Prop({
    default: ''
  })
  desc?: string;
}

export class Photo {
  @Prop({
    required: true
  })
  photo: string;
}

export class Quote {
  @Prop({
    required: true
  })
  quote: string;

  @Prop({
    required: true
  })
  author: string;
}

export class Text {
  @Prop({
    required: true,
    minlength: MinMax.TitleMin,
    maxlength: MinMax.TitleMax
  })
  title: string;

  @Prop({
    required: true,
    minlength: MinMax.AnnMin,
    maxlength: MinMax.AnnMax
  })
  ann: string;

  @Prop({
    required: true,
    minlength: MinMax.TextMin,
    maxlength: MinMax.TextMax
  })
  text: string;
}

export class Video {
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

export type Content = Link | Photo | Quote | Text | Video
