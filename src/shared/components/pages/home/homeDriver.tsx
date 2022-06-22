/* eslint-disable @next/next/no-img-element */
import { logoIcon } from "@/assets"
import {
  CompoundingFilterForm,
  InfiniteScrollWrapper,
  RidesItem,
} from "@/components"
import { HeaderAccount } from "@/components/header/headerAccount"
import { compoundingTypeFilters, LIMIT_COMPOUNDING_LIST } from "@/helper"
import { CompoundingDriverListParams, CompoundingOrderField } from "@/models"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { FiPlusCircle } from "react-icons/fi"
import { useCompoundingDriverList, useScrollTop } from "shared/hook"

const Wrapper = ({ children }: { children: ReactNode }) => {
  const height = useScrollTop()
  return (
    <div className={`${height > 400 ? "rides__driver-filter-active" : ""}`}>
      {children}
    </div>
  )
}

export const HomeDriver = () => {
  const router = useRouter()
  const {
    data: carpoolingList,
    isLimit,
    isValidating,
    isFetchingMore,
    filterRides,
  } = useCompoundingDriverList({
    limit: LIMIT_COMPOUNDING_LIST,
  })

  useEffect(() => {
    if (!router?.query) return
    const { order_by, from_province_id, to_province_id, car_id } = router.query

    let queryObj: CompoundingDriverListParams = {
      ...router.query,
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
    filterRides(queryObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const handleFilter = () => { 
    
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
                    onChange={(data) => {
                      router.push(
                        {
                          query: data
                            ? { ...router.query, ...data, offset: 0 }
                            : {},
                        },
                        undefined,
                        {
                          shallow: true,
                          scroll: true,
                        }
                      )
                    }}
                  />
                </Wrapper>
              </div>
              <div className="rides__driver-right">
                <div className="rides__filter">
                  <div className="rides__filter-type">
                    {compoundingTypeFilters.map((item) => (
                      <div
                        onClick={() => {
                          router.push(
                            {
                              query: {
                                ...router.query,
                                compounding_type: item.value,
                                offset: 0,
                              },
                            },
                            undefined,
                            {
                              shallow: true,
                            }
                          )
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
                <InfiniteScrollWrapper
                  onBottom={() => {
                    const offset =
                      (Number(router.query?.offset) || 0) +
                      LIMIT_COMPOUNDING_LIST
                    router.push(
                      {
                        query: {
                          ...router.query,
                          offset,
                        },
                      },
                      undefined,
                      {
                        scroll: false,
                        shallow: true,
                      }
                    )
                  }}
                  isLimit={isLimit}
                  isLoading={isValidating || isFetchingMore}
                >
                  <div className="home-customer__rides grid grid-col-1 grid-col-sm-2 grid-col-lg-2 grid-col-2xl-3">
                    {carpoolingList.map((item, index) => (
                      <RidesItem type="driver" rides={item} key={index} />
                    ))}
                  </div>
                </InfiniteScrollWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
