interface ExtraMap {}

interface Major {
  major_id: string
  parent_id: string
  name: string
}

interface University {
  university_id: string
  name: string
  logo: string
}

export interface UserInfo {
  user_id: string
  user_name: string
  company: string
  job_title: string
  avatar_large: string
  level: number
  description: string
  followee_count: number
  follower_count: number
  post_article_count: number
  digg_article_count: number
  got_digg_count: number
  got_view_count: number
  post_shortmsg_count: number
  digg_shortmsg_count: number
  isfollowed: boolean
  favorable_author: number
  power: number
  study_point: number
  university: University
  major: Major
  student_status: number
  select_event_count: number
  select_online_course_count: number
  identity: number
  is_select_annual: boolean
  select_annual_rank: number
  annual_list_type: number
  extraMap: ExtraMap
  is_logout: number
}
