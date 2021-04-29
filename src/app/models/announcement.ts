export interface Announcement {
  id: number
  author_id: number
  img_name?: string
  title: string
  description: string
  pub_date: string
  event_date?: string
  location?: number
  type: number
}
