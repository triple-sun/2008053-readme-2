import { Link, LinkModel } from "./link.model";
import { Photo, PhotoModel } from "./photo.model";
import { Quote, QuoteModel } from "./quote.model";
import { Text, TextModel } from "./text.model";
import { Video, VideoModel } from "./video.model";

export const ContentType = {
  Link: LinkModel.name,
  Photo: PhotoModel.name,
  Quote: QuoteModel.name,
  Text: TextModel.name,
  Video: VideoModel.name
}

export type Content = Video | Link | Photo | Quote | Text
