import {
  createContext,
  ReactNode,
  useState,
} from "react";

interface YearContextDataProps {
  year: number;
  setYear: (val: number) => void
}

export const YearContext = createContext({} as YearContextDataProps)

export function YearContextProvider({ children }: { children: ReactNode }) {

  const [val, set] = useState(new Date().getFullYear())

  function setYear(year: number){
    set(year)
  }

  return (
    <YearContext.Provider
      value={{
        year: val,
        setYear
      }}
    >
      {children}
    </YearContext.Provider>
  )

}
