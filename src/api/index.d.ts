import { UserInfo } from './user'

export type Res<T extends Record<string, unknown>> =
  | ({ code: 0 } & T)
  | { code: 404; error_message: string }

export function getCategories(): Promise<CategoriesResponse>
interface CategoryBase {
  category_id: number
  category_name: string
}
interface Category extends CategoryBase {
  children?: CategoryBase[]
}

interface CategoriesData {
  categories: Category[]
}

export type CategoriesResponse = Res<{ data: CategoriesData }>

type SortBy = 'hot' | 'new'

export function getArticles(
  categoryId: number,
  sortBy: SortBy,
  offset: number,
  limit: number,
): Promise<ArticlesResponse>
export type ArticlesResponse = Res<{
  data: ArticlesData
  total: number
  has_more: boolean
}>

interface ArticlesData {
  articles: Article[]
}

interface Article {
  article_id: string
  article_info: ArticleInfo
  author_user_info: UserInfo
  category_info: CategoryInfo
  article_content: string
}
interface ArticleInfo {
  article_id: string
  user_id: string
  category_id: string
  tag_ids: number[]
  visible_level: number
  link_url: string
  cover_image: string
  is_gfw: number
  title: string
  brief_content: string
  is_english: number
  is_original: number
  user_index: number
  original_type: number
  original_author: string
  content: string
  ctime: string
  mtime: string
  rtime: string
  draft_id: string
  view_count: number
  collect_count: number
  digg_count: number
  comment_count: number
  hot_index: number
  is_hot: number
  rank_index: number
  status: number
  verify_status: number
  audit_status: number
  mark_content: string
}
interface CategoryInfo {
  first_category_id: number
  first_category_name: string
  second_category_id: number
  second_category_name: string
}

export function getArticleById(articleId: string): Promise<ArticleResponse>
export type ArticleResponse = Res<{ data: { article: Article } }>

export function getCommentsByArticleId(
  articleId: string,
  offset: number,
  limit: number,
): Promise<CommentsResponse>
export type CommentsResponse = Res<{
  data: CommentsData
  total: number
  show_more: boolean
}>
interface CommentsData {
  articleId: string
  comments: Comment[]
}
interface Comment {
  comment_id: string
  comment_info: CommentInfo
  user_info: UserInfo
  reply_infos: ReplyInfo[]
}

interface ReplyInfo {
  reply_id: number
  reply_info: CommentReply
  user_info: UserInfo
}

interface CommentInfo {
  comment_id: string
  user_id: string
  item_id: string
  item_type: number
  comment_content: string
  comment_pics: any[]
  comment_status: number
  ctime: number
  comment_replys: CommentReply[]
  digg_count: number
  bury_count: number
  reply_count: number
  is_digg: boolean
  is_bury: boolean
  level: number
}

interface CommentReply {
  reply_id: string
  reply_comment_id: string
  user_id: string
  reply_to_reply_id: string
  reply_to_user_id: string
  item_id: string
  item_type: number
  reply_content: string
  reply_pics: any[]
  reply_status: number
  ctime: number
  digg_count: number
  burry_count: number
}
