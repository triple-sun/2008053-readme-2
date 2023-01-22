import { IntersectionType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { extend } from "joi";
import { LinkDTO } from "./dto/content/link.dto";
import { PhotoDTO } from "./dto/content/photo.dto";
import { QuoteDTO } from "./dto/content/quote.dto";
import { TextDTO } from "./dto/content/text.dto";
import { VideoDTO } from "./dto/content/video.dto";
import { PostLinkRDO, PostQuoteRDO, PostTextRDO, PostVideoRDO } from "./dto/post/post.rdo";

export const ClassForType = {
  DTO: {
    [ContentType.LINK]: LinkDTO,
    [ContentType.QUOTE]: QuoteDTO,
    [ContentType.VIDEO]: VideoDTO,
    [ContentType.TEXT]: TextDTO,
    [ContentType.LINK]: PhotoDTO,
  },
  RDO: {
    [ContentType.LINK]: PostLinkRDO,
    [ContentType.QUOTE]: PostQuoteRDO,
    [ContentType.VIDEO]: PostVideoRDO,
    [ContentType.TEXT]: PostTextRDO,
    [ContentType.LINK]: PostLinkRDO
  }}

export class PostRDO extends IntersectionType(
  IntersectionType( PostLinkRDO, IntersectionType(PostLinkRDO, PostQuoteRDO)),
  IntersectionType( PostVideoRDO, PostTextRDO)
) {}
