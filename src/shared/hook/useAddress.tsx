import { SWRConfig } from "@/helper"
import { DistrictId, ProvinceId, WardId } from "@/models"
import { addressApi } from "@/services"
import { useEffect, useState } from "react"
import useSWR from "swr"

interface UseAddress {
  getWards: (id: number) => void
  getDistricts: (id: number) => void
  states: ProvinceId[]
  districts: DistrictId[]
  wards: WardId[]
  clearDistricts: Function
  clearWards: Function
  clearAddressList: Function
  setDistricts: Function
  setWards: Function
  getProvinceId: (stringTerms: string) => number | undefined
}

export const useAddress = (
  shouldFetch = true,
  state_id?: number,
  district_id?: number
): UseAddress => {
  const { data, isValidating } = useSWR<ProvinceId[]>(
    "address_form",
    shouldFetch ? () => getStates() : null,
    {
      dedupingInterval: 10000000,
      ...SWRConfig,
    }
  )

  const [districts, setDistricts] = useState<DistrictId[]>([])
  const [wards, setWards] = useState<WardId[]>([])

  useEffect(() => {
    if (state_id) {
      getDistricts(state_id)
    }

    if (district_id) {
      getWards(district_id)
    }
  }, [])

  const getDistricts = (state_id: number) => {
    addressApi
      .getDistricts([state_id])
      .then((res: any) => setDistricts(res?.result?.data || []))
      .catch((err) => console.log(err))
  }

  const getStates = () =>
    addressApi
      .getProvinces()
      .then((res: any) => res?.result?.data || [])
      .catch((err) => console.log(err))

  const getWards = (district_id: number) => {
    addressApi
      .getWards([district_id])
      .then((res: any) => setWards(res?.result?.data || []))
      .catch((err) => console.log(err))
  }

  const clearAddressList = () => {
    setDistricts([])
    setDistricts([])
    setWards([])
  }

  const clearDistricts = () => {
    setDistricts([])
  }

  const clearWards = () => {
    setWards([])
  }

  const getProvinceId = (stringTerms: string): number | undefined => {
    if (!data?.length) return

    const provinceId = data.find(
      (item) => item.province_vietnamese_name === stringTerms
    )?.province_id

    return provinceId
  }

  return {
    getWards,
    getDistricts,
    districts,
    wards,
    states: data || [],
    clearDistricts,
    clearWards,
    clearAddressList,
    setDistricts,
    setWards,
    getProvinceId,
  }
}
