import { useCallback, useEffect, useState } from "react"

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState<boolean>(false)

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addEventListener("change", updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeEventListener('change', )
  }, [])

  return targetReached
}
