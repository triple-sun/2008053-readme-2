import { Property } from "../enum/property.enum";
import { Entity } from "../enum/utils.enum";

export const APIExample = {
  [Entity.Post]: {
   [Property.IsDraft]: 'true',
   [Property.IsRepost]: 'false',
   [Property.Type]: 'video',
   [Property.PostID]: '22',
   [Property.Tag]: 'example',
   [Property.Tags]: `['example', 'tag', 'array']`,
   [Property.Link]: 'https://link.subdomain.domain',
   [Property.Desc]: 'Link description example',
   [Property.Title]: 'Post title example',
   [Property.Ann]: 'Lorem ipsum dolor sit amet.',
   [Property.Text]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada.',
   [Property.Quote]: 'Lorem ipsum dolor sit amet.',
   [Property.Author]: 'Dante',
   [Property.PhotoLink]: '/upload/photo.jpg',
   [Property.VideoLink]: 'https://youtube.com/video',
  }
}
