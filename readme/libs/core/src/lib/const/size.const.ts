import Property from "../enum/property.enum"

type TSizeMax = {Max: number}
type TSIzeFull = TSizeMax & {Min: number}

const getSizeMax = (max: number): TSizeMax => ({Max: max})
const getSizeFull = (max: number, min: number): TSIzeFull => ({Max: max, Min: min})

const SizeFull = {
  Tag: getSizeFull(10, 3);
  Title: getSizeFull(50, 20),
  Ann: getSizeFull(255, 50),
  Text: getSizeFull(1024, 300),
  Quote: getSizeFull(300, 20),
  Author: getSizeFull(50, 3),
  Port: getSizeFull(65535, 0),
  Name: getSizeFull(50, 30),
  Password: getSizeFull(12, 6),
  Comment: getSizeFull(300, 10),
}

const SizeMax = {
    Desc: getSizeMax(300),
  Comments: getSizeMax(50),
  Avatar: getSizeMax(500000),
  Photo: getSizeMax(1000000),
  Tags: getSizeMax(8),
  Query: getSizeMax(25),
  Search: getSizeMax(20)
}

export const Size = {...SizeFull, ...SizeMax}
