/* eslint-disable @next/next/no-img-element */
import { logoIcon } from "@/assets"
import { CompoundingFilterForm, HeaderAccount, Modal, RidesItem } from "@/components"
import { compoundingTypeFilters, LIMIT_COMPOUNDING_LIST } from "@/helper"
import {
  CompoundingFilterFormParams,
  CompoundingListDriverParams,
  CompoundingOrderField,
} from "@/models"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { FiPlusCircle } from "react-icons/fi"
import InfiniteScroll from "react-infinite-scroll-component"
import { useCompoundingCarDriverList, useScrollTop } from "shared/hook"

const Wrapper = ({ children }: { children: ReactNode }) => {
  const height = useScrollTop()
  return <div className={`${height > 400 ? "rides__driver-filter-active" : ""}`}>{children}</div>
}

export const HomeDriver = () => {
  const router = useRouter()
  const {
    data: carpoolingList,
    isLimit,
    filterRides,
    fetchMoreRides,
  } = useCompoundingCarDriverList(getQueryParams(router.query))
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const handleCloseFilter = (status: boolean) => {
    setShowFilter(status)
    // toggleBodyOverflow(status ? "hidden" : "unset")
  }

  const handleFetchMoreRides = () => {
    router.push(
      {
        query: {
          ...router.query,
          offset: (Number(router.query?.offset) || 0) + LIMIT_COMPOUNDING_LIST,
        },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    )
  }

  useEffect(() => {
    if (!router.isReady) return
    const offset = Number(router.query?.offset)
    if (offset) {
      fetchMoreRides({
        ...getQueryParams(router.query),
        offset,
      })
    } else {
      filterRides(getQueryParams(router.query))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  function getQueryParams(params: CompoundingFilterFormParams): CompoundingListDriverParams {
    const { order_by, from_province_id, to_province_id, car_id } = params

    let queryObj: CompoundingListDriverParams = {
      ...params,
      offset: Number(router.query?.offset) || 0,
      limit: LIMIT_COMPOUNDING_LIST,
    }
    if (order_by) {
      delete (queryObj as any).order_by
      queryObj[order_by as CompoundingOrderField] = true
    }
    if (from_province_id) {
      queryObj.from_province_id = Number(from_province_id)
    }
    if (to_province_id) {
      queryObj.to_province_id = Number(to_province_id)
    }
    if (car_id) {
      queryObj.car_id = Number(car_id)
    }
    Object.keys(queryObj).forEach(
      (item) => !(queryObj as any)?.[item] && delete (queryObj as any)[item]
    )
    return queryObj
  }

  const handleFilterRides = (params: CompoundingFilterFormParams | undefined) => {
    router.push(
      {
        query: params ? { ...router.query, ...params, offset: 0 } : {},
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    )
    // filterRides({ ...getQueryParams(params), offset: 0 })
  }

  return (
    <section className="home-customer__container">
      <header className="home-customer__header px-24">
        <div className="container">
          <div className="home-customer__header__inner">
            <div className="home-customer__header-top">
              <div className="home-customer__header-logo">
                <Link passHref href="/">
                  <div className="cursor-pointer">{logoIcon()}</div>
                </Link>
              </div>

              <div className="home-customer__header-user">
                <HeaderAccount />
              </div>
            </div>

            <div className="home-customer__header-content">
              <ul className="home-mobile__nav">
                <li className="home-mobile__nav-item">
                  <div
                    onClick={() => router.push("/driver/create_compounding")}
                    className="nav__item cursor-pointer"
                  >
                    <span className="nav__item-icon">
                      <FiPlusCircle />
                    </span>
                    <span className="nav__item-title">Tạo chuyến đi</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="home-customer__content">
        <div className="container">
          <div className="rides-container">
            <div className="rides__driver">
              <div className="rides__driver-left">
                <Wrapper>
                  <CompoundingFilterForm
                    type="driver"
                    defaultValues={router.query}
                    onChange={(data) => handleFilterRides(data)}
                  />
                </Wrapper>
              </div>
              <div className="rides__driver-right">
                <div className="rides__filter">
                  <div className="rides__filter-type">
                    {compoundingTypeFilters.map((item) => (
                      <div
                        onClick={() => {
                          handleFilterRides({
                            ...router.query,
                            compounding_type: item.value,
                          })
                        }}
                        key={item.value}
                        className={`rides__filter-type-item ${
                          router.query?.compounding_type === item.value
                            ? "rides__filter-type-item-active"
                            : ""
                        }`}
                      >
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <InfiniteScroll
                  dataLength={carpoolingList.length}
                  next={handleFetchMoreRides}
                  hasMore={!isLimit}
                  loader={<h4>Loading...</h4>}
                >
                  <div className="home-customer__rides grid grid-col-1 grid-col-sm-2 grid-col-lg-2 grid-col-2xl-3">
                    {carpoolingList.map((item, index) => (
                      <RidesItem type="driver" rides={item} key={index} />
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </div>

            <div className="rides__filter-mobile">
              <button onClick={() => handleCloseFilter(true)} className="btn-primary">
                Lọc
              </button>
              {showFilter ? (
                <Modal onClose={() => handleCloseFilter(false)}>
                  <div className="px-24 py-12">
                    {router.isReady ? (
                      <CompoundingFilterForm
                        type="customer"
                        defaultValues={router.query}
                        onChange={(data) => {
                          router.push(
                            {
                              query: data ? { ...router.query, ...data, offset: 0 } : {},
                            },
                            undefined,
                            {
                              shallow: true,
                              scroll: true,
                            }
                          )
                        }}
                      />
                    ) : null}
                  </div>
                </Modal>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
