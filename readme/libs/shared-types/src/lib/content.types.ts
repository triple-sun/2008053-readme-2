type Link = {
  link: string;
  desc?: string;
}

type Photo = {
  photo: string;
  content: string;
}

type Quote = {
  quote: string;
  author: string;
}

type Text = {
  title: string;
  ann: string;
  text: string;
}

type Video = {
  title: string;
  videoLink: string;
}

export type Content = Link | Photo | Quote | Text |  Video
