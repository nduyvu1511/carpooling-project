import _ from "lodash"
import { useEffect, useState } from "react"

const useResize = () => {
  const [width, setWidth] = useState<number>(
    document.documentElement.offsetWidth
  )

  useEffect(() => {
    const getWidth = () =>
      // _.throttle(() => , 500);
      setWidth(document.documentElement.offsetWidth)
    window.addEventListener("resize", getWidth)

    return () => window.removeEventListener("resize", getWidth)
  }, [])

  return width
}

export default useResize
