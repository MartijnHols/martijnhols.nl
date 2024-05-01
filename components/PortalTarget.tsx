import { ReactNode, createContext, useContext, useState } from 'react'

const PortalTargetContext = createContext<HTMLDivElement | null>(null)
export const usePortalTarget = () => useContext(PortalTargetContext)

interface Props {
  children: ReactNode
}

export default function PortalTarget({ children }: Props) {
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null)

  return (
    <PortalTargetContext.Provider value={portalTarget}>
      {children}

      <div ref={setPortalTarget} />
    </PortalTargetContext.Provider>
  )
}
