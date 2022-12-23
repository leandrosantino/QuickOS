import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  ReactComponentElement,
  JSXElementConstructor,
  useContext
} from "react";

import { DialogContainer } from "../components/containers/DialogContainer";


type DialogsNames = keyof typeof DialogComponents

export interface DialogContextDataProps {
  visible: boolean;
  type: DialogsNames;

}

interface DialogContextProviderProps {
  children: ReactNode;
}

export const DialogContext = createContext({} as DialogContextDataProps)

export function DialogContextProvider({ children }: DialogContextProviderProps) {

  const [visible, setVisible] = useState(true)
  const [type, setType] = useState<DialogsNames>('Success')

  return (
    <DialogContext.Provider
      value={{
        visible,
        type,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export function Dialogs() {

  const { visible, type } = useContext(DialogContext)

  const DialogConponent = DialogComponents[type]

  return (
    <>
      {visible &&
        <DialogContainer
          width={"20%"}
          height={"20%"}
        >
          <div
            className='w-full h-full bg-gray-200 shadow-xl'
          >
            <DialogConponent />
          </div>
        </DialogContainer>
      }
    </>
  )
}

const DialogComponents = {
  Success: () => (<>Sucesso</>),
  Error: () => (<>Erro</>),
  Question: () => (<>Pergunta</>),
}
