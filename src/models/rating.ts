import { GroupTimeType, TIME_TYPE } from "./chat"

export type RatingRangePost = 1 | 2 | 3 | 4 | 5
export type RatingRange = 0 | 1 | 2 | 3 | 4 | 5

export interface CreateRatingParamsNoToken {
compounding_car_customer_id: number
rating_number: number
rating_tag_ids?: number[]
rating_content: string
}

export interface CreateRatingFormParams {
rating_number: number
rating_tag_ids?: number[]
rating_content: string
}

export interface CreateRatingParams extends CreateRatingParamsNoToken {
token: string
}

export interface UpdateRatingParams extends CreateRatingParams {
rating_id: number
}

export interface DeleteRatingParams {
token: string
rating_id: number
}

export interface RatingTagRes {
tag_id: number
tag_content: string
}

export interface RatingRes {
compounding_car_customer_id: number
compounding_car_customer_name: string
partner_id: {
  partner_id: number
  partner_name: string
  avatar_url: {
    image_id: number
    image_url: string
  }
}
duration: {
  time_value: number
  time_type: TIME_TYPE
}
rating_id: number
rating_tag_ids: RatingTagRes[]
rating_number: RatingRangePost
rating_content: string
rating_reported: string
}
