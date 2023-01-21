import { ApiProperty, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsDate, IsDefined, IsInt, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { ContentDTO } from "../content/content.dto";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { PostProperty } from "../../utils/api.utils";
import { Size } from "../../const/size.const";
import { Property } from "../../enum/property.enum";

const { Tag, Tags, PostID, AuthorID, PublishAt, Type: PostType } = Property;

export class Post {
  @Expose()
  @IsInt()
  public postID?: number;

  @Expose()
  @IsDefined()
  public type: ContentType;

  @Expose()
  public isRepost?: boolean;

  @Expose()
  public isDraft?: boolean;

  @Expose()
  @IsMongoId()
  public authorID?: string;

  @Expose()
  @Transform(({value, obj}) => !value ? obj.postID ?? obj.id : value )
  @IsNumber()
  public originID?: number;

  @Expose()
  @IsArray()
  public tags?: string[];
}

export class PostIDDTO extends PickType(Post, ['postID']) {
  @Expose({name: Property.ID })
  @Transform(({value}) => +value)
  @IsInt()
  @ApiProperty(PostProperty(PostID))
  public postID: number;
}

export class TagDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiPropertyOptional(PostProperty(Tag))
  public tag?: string;
}

export class PostTagsDTO extends PickType(Post, ['tags']) {
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateLength({})
  @ArrayMaxSize(Size.Tags.Max)
  @Transform(({ value }) => value ? [... new Set(value.map((tag: string) => tag.toLowerCase()))] : [])
  @ApiPropertyOptional(PostProperty(Tags, { maxItems: Size.Tags.Max }))
  public tags?: string[];
}


export class TypeDTO extends PickType(Post, ['type'])  {
  @Expose()
  @IsString()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(PostType, {name: PostType, enum: ContentType }))
  public type: ContentType;
}

export class AuthorIDDTO extends PickType(Post, ['authorID'])  {
  @Expose()
  @IsMongoId()
  @ApiProperty(PostProperty(AuthorID))
  public authorID: string;
}

export class PostsSinceDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(PostProperty(PublishAt))
  publishAt: Date;
}

export class PostCreateDTO extends IntersectionType(
  PostTagsDTO, ContentDTO
) {}


export class PostUpdateDTO extends IntersectionType(
  PostsSinceDTO,
  PartialType(PostCreateDTO)
) {}
