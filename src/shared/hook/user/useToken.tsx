import { RootState } from "@/core/store"
import { useDispatch, useSelector } from "react-redux"

interface Res {
  token: string
  setToken: (params: string | undefined) => void
}

const useToken = (): Res => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const setToken = (token: string | undefined) => {
    dispatch(setToken(token))
  }

  return {
    setToken,
    token,
  }
}

export { useToken }
