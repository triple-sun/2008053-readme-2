import { SortByType, SortType } from "./post.enum";

export const SORT_TYPES = [...Object.values(SortType)]
export const SORT_BY_TYPES = [...Object.values(SortByType)]

export const POST_DEFAULT_LIMIT = 25;
export const POST_DEFAULT_SORT_TYPE = SortType.Desc
export const POST_DEFAULT_TYPE = 'all'
export const POST_DEFAULT_SORT_BY_TYPE = SortByType.Date
