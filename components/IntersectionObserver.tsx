import { useEffect, useRef } from 'react'

const useIntersectionObserver = (
  onChange: (isIntersecting: boolean) => void,
) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elem = ref.current
    if (!elem) {
      return
    }

    const observer = new IntersectionObserver(([entry]) =>
      onChange(entry.isIntersecting),
    )
    observer.observe(elem)

    return () => observer.disconnect()
  }, [])

  return ref
}

export default useIntersectionObserver
