import { ReactNode, useEffect, useRef } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useInView } from "react-intersection-observer"

interface InfiniteScrollWrapper {
  children: ReactNode
  onBottom: Function
  isLoading?: boolean
}

export const InfiniteScrollWrapper = ({
  children,
  onBottom,
  isLoading = false,
}: InfiniteScrollWrapper) => {
  const { ref, inView } = useInView()
  const secondRef = useRef<boolean>()

  useEffect(() => {
    document?.documentElement?.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (!secondRef?.current) {
      secondRef.current = true
      return
    }

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
