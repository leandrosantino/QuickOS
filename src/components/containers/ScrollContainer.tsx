import { ReactNode } from 'react'

interface ScrollContainerProps {
  children?: ReactNode;
  className?: string | undefined;
}

export function ScrollContainer({ className, children }: ScrollContainerProps) {
  return (
    <div
      className={`
        overflow-y-auto
        scrollbar-thumb-gray-500
        scrollbar-thumb-rounded-xl
        scrollbar-track-rounded-xl
        scrollbar-track-gray-300
        scrollbar-thin
      `+className}
    >
      {children}
    </div>
  )
}
