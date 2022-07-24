import {
  CreateRatingParams,
  DeleteRatingParams,
  RatingRes,
  UpdateRatingParams,
  UseParams,
} from "@/models"
import { ratingApi } from "@/services"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "../user"

interface Res {
  deleteRating: (_params: UseParams<DeleteRatingParams, RatingRes>) => void
  addRating: (_params: UseParams<CreateRatingParams, RatingRes>) => void
  updateRating: (_params: UseParams<UpdateRatingParams, RatingRes>) => void
  reportRating: (_params: UseParams<DeleteRatingParams, any>) => void
}

export const useRatingAction = (): Res => {
  const dispatch = useDispatch()
  const router = useRouter()
  const token = useToken()

  const deleteRating = async (_params: UseParams<DeleteRatingParams, RatingRes>) => {
    const { params, onSuccess, onError } = _params
    try {
      const res: any = await ratingApi.deleteRating(params)
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại", "error"))
        onError && onError()
        return
      }
      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
    }
  }

  const addRating = async (_params: UseParams<CreateRatingParams, RatingRes>) => {
    const { params, onSuccess, onError } = _params
    try {
      const res: any = await ratingApi.createRating(params)
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại", "error"))
        onError && onError()
        return
      }
      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
    }
  }

  const updateRating = async (_params: UseParams<UpdateRatingParams, RatingRes>) => {
    const { params, onSuccess, onError } = _params
    try {
      const res: any = await ratingApi.updateRating(params)
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại", "error"))
        onError && onError()
        return
      }
      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
    }
  }

  const reportRating = async (_params: UseParams<DeleteRatingParams, any>) => {
    const { params, onSuccess, onError } = _params
    try {
      const res: any = await ratingApi.reportRating(params)
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại", "error"))
        onError && onError()
        return
      }
      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
    }
  }

  return {
    addRating,
    deleteRating,
    updateRating,
    reportRating,
  }
}
