/* eslint-disable @next/next/no-img-element */
import { logoIcon } from "@/assets"
import {
  CompoundingFilterForm,
  HomeNav,
  InfiniteScrollWrapper,
  Modal,
  RidesItem
} from "@/components"
import { HeaderAccount } from "@/components/header/headerAccount"
import { LIMIT_COMPOUNDING_LIST } from "@/helper"
import { CompoundingOrderField, GetCarpoolingListParams } from "@/models"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { useCarpoolingList, useScrollTop } from "shared/hook"

const Wrapper = ({ children }: { children: ReactNode }) => {
  const height = useScrollTop()
  return (
    <div className={`${height > 400 ? "rides__driver-filter-active" : ""}`}>
      {children}
    </div>
  )
}

export const HomeCustomer = () => {
  const router = useRouter()
  const {
    data: carpoolingList,
    isLimit,
    isValidating,
    isFetchingMore,
    filterRides,
  } = useCarpoolingList({ token: "", limit: LIMIT_COMPOUNDING_LIST })
  const [showFilter, setShowFilter] = useState<boolean>(false)

  useEffect(() => {
    if (!router?.query) return
    const { order_by, from_province_id, to_province_id, car_id } = router.query

    let queryObj: GetCarpoolingListParams = {
      token: "",
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

  const handleCloseFilter = (status: boolean) => {
    setShowFilter(status)
    // toggleBodyOverflow(status ? "hidden" : "unset")
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
              <HomeNav />
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
                    type="customer"
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
                      <RidesItem
                        onClick={(id) =>
                          router.push(
                            `/customer/create_compounding?compounding_car_id=${id}`
                          )
                        }
                        type="customer"
                        rides={item}
                        key={index}
                      />
                    ))}
                  </div>
                </InfiniteScrollWrapper>
              </div>
            </div>

            <div className="rides__filter-mobile">
              <button
                onClick={() => handleCloseFilter(true)}
                className="btn-primary"
              >
                Lọc
              </button>
              {showFilter ? (
                <Modal onClose={() => handleCloseFilter(false)}>
                  <div className="px-24 py-12">
                    <CompoundingFilterForm
                      type="customer"
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
