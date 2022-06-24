import { SWRConfig } from "@/helper"
import { FilledDataFieldsKey, FilledDataFieldsRes } from "@/models"
import { userApi } from "@/services"
import useSWR from "swr"
import { useToken } from "../user/useToken"

interface Res {
  isValidating: boolean
  data: FilledDataFieldsRes | undefined
  setFillDataForm: (key: FilledDataFieldsKey) => void
}

export const useFetchFilledDataFields = (shouldFetch = true): Res => {
  const { token } = useToken()

  const { data, isValidating, mutate } = useSWR<FilledDataFieldsRes>(
    "get_filled_data_fields",
    token && shouldFetch
      ? () =>
          userApi
            .getFilledDataFields(token)
            .then((res: any) => res?.result?.data)
      : null,
    {
      ...SWRConfig,
    }
  )

  const setFillDataForm = (key: FilledDataFieldsKey) => {
    if (!data) return
    mutate({ ...data, [key]: true } as FilledDataFieldsRes, false)
  }

  return {
    data,
    isValidating,
    setFillDataForm,
  }
}
