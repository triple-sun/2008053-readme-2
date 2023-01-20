import { getSize } from "../utils/common.utils";

export const Size = {
  Tag: getSize(10, 3),
  Title: getSize(50, 20),
  Ann: getSize(255, 50),
  Text: getSize(1024, 300),
  Quote: getSize(300, 20),
  Author: getSize(50, 3),
  Desc: getSize(300),
  Name: getSize(50, 30),
  Pass: getSize(12, 6),
  Comment: getSize(300, 10),
  Comments: getSize(50),
  Port: getSize(65535, 0),
  Avatar: getSize(500000),
  Photo: getSize(1000000),
  Tags: getSize(8),
  Query: getSize(25),
  Search: getSize(20)
}
