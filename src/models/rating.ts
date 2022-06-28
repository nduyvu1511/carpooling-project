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

export interface DeleteRatingParams {
  token: string
  rating_id: number
}

export interface RatingTagRes {
  tag_id: number
  tag_content: string
}
