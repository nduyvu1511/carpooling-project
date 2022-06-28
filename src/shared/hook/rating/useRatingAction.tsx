import { CreateRatingParams, DeleteRatingParams } from "@/models"
import { ratingApi } from "@/services"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useToken } from "../user"

interface Res {
  deleteRating: (params: DeleteRatingParams, onSuccess: Function, onErr?: Function) => void
  addRating: (params: CreateRatingParams, onSuccess: Function, onErr?: Function) => void
  updateRating: (params: CreateRatingParams, onSuccess: Function, onErr?: Function) => void
}

export const useRatingAction = (): Res => {
  const dispatch = useDispatch()
  const router = useRouter()
  const token = useToken()

  const deleteRating = async (
    params: DeleteRatingParams,
    onSuccess: Function,
    onErr?: Function
  ) => {
    try {
      const res: any = await ratingApi.deleteRating(params)
      if (!res?.result?.success) {
        onErr && onErr()
        return
      }
    } catch (error) {
      onErr && onErr()
    }
  }

  const addRating = async (params: CreateRatingParams, onSuccess: Function, onErr?: Function) => {
    try {
      const res: any = await ratingApi.createRating(params)
      if (!res?.result?.success) {
        onErr && onErr()
        return
      }
    } catch (error) {
      onErr && onErr()
    }
  }

  const updateRating = async (
    params: CreateRatingParams,
    onSuccess: Function,
    onErr?: Function
  ) => {
    try {
      const res: any = await ratingApi.updateRating(params)
      if (!res?.result?.success) {
        onErr && onErr()
        return
      }
    } catch (error) {
      onErr && onErr()
    }
  }

  return {
    addRating,
    deleteRating,
    updateRating,
  }
}
