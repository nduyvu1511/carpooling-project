import { ReactNode, useEffect } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useInView } from "react-intersection-observer"

interface InfiniteScrollWrapper {
  children: ReactNode
  onBottom: Function
  isLoading?: boolean
  isLimit?: boolean
}

export const InfiniteScrollWrapper = ({
  children,
  onBottom,
  isLoading = false,
  isLimit = false,
}: InfiniteScrollWrapper) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    document?.documentElement?.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    if (isLimit) return
    if (isLoading) return
    if (!inView) return

    onBottom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className="infinite__wrapper">
      {children}

      {isLoading ? (
        <div className="infinite__wrapper-loading">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}
      <div ref={ref}></div>
    </div>
  )
}
