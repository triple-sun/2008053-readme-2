import { RouteInfo } from "@nestjs/common/interfaces";
import { RequestMethod } from '@nestjs/common';
import { Path } from '@readme/core';

export const BlogPrivateRoutes: RouteInfo[] = [
  {
    path: Path.Posts,
    method: RequestMethod.DELETE
  }, {
    path: Path.Posts,
    method: RequestMethod.PATCH
  }, {
    path: Path.Posts,
    method: RequestMethod.POST
  }, {
    path: Path.Posts,
    method: RequestMethod.DELETE
  }, {
    path: Path.Comments,
    method: RequestMethod.POST
  }, {
    path: Path.Comments,
    method: RequestMethod.DELETE
  }, {
    path: Path.Subscribe,
    method: RequestMethod.POST
  }
]