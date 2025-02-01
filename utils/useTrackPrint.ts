import { useEffect } from 'react'

const useTrackPrint = () => {
  useEffect(() => {
    const handlePrint = () => {
      console.log('Detected page printing')
      window.plausible?.('Print')
    }

    window.addEventListener('beforeprint', handlePrint)
    return () => {
      window.removeEventListener('beforeprint', handlePrint)
    }
  }, [])
}

export default useTrackPrint
