import { ReactNode } from 'react'

interface TabContainerProps {
  children?: ReactNode;
}

export function TabContainer({children}:TabContainerProps) {

  return (
    <div
        className="
          w-full h-7
          bg-gray-800
        "
    >
      {children}
    </div>
  )
}
