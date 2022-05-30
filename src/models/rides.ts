export interface RidesSlice {
  modal: RideModalSearch
}

export interface RideModalSearch {
  isOpenSearchModal: boolean | undefined
  type: "from" | "to" | undefined
}
